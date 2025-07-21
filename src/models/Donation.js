import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: false, // Make optional to support public donations
        index: true
    },
    donationId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Amount must be at least ₹1'],
        validate: {
            validator: Number.isInteger,
            message: 'Amount must be a whole number'
        }
    },
    purpose: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Purpose cannot exceed 200 characters']
    },
    paymentMode: {
        type: String,
        enum: {
            values: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash', 'Cheque', 'Bank Transfer'],
            message: 'Invalid payment mode'
        },
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'Completed', 'Failed', 'Refunded', 'Cancelled'],
            message: 'Invalid donation status'
        },
        default: 'Pending',
        index: true
    },
    donationDate: {
        type: Date,
        default: Date.now,
        index: true
    },
    receiptGenerated: {
        type: Boolean,
        default: false
    },
    receiptNumber: {
        type: String,
        sparse: true, // Allows multiple null values
        trim: true
    },
    taxBenefit: {
        type: Boolean,
        default: true
    },
    taxExemptionCertificate: {
        type: String, // URL or file path
        trim: true
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters'],
        trim: true
    },
    // Payment gateway specific fields
    gatewayOrderId: {
        type: String,
        trim: true
    },
    gatewayPaymentId: {
        type: String,
        trim: true
    },
    gatewaySignature: {
        type: String,
        trim: true
    },
    // Campaign or category
    campaign: {
        type: String,
        trim: true,
        default: 'General Fund'
    },
    // Direct donor fields for easier queries (for public donations)
    donorName: {
        type: String,
        required: true,
        trim: true
    },
    donorEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    donorPhone: {
        type: String,
        required: true,
        trim: true
    },
    donorAddress: {
        type: String,
        required: true,
        trim: true
    },
    donorPan: {
        type: String,
        trim: true,
        uppercase: true,
        validate: {
            validator: function (v) {
                return !v || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
            },
            message: 'Invalid PAN number format'
        }
    },
    // Donor information (for tax receipts) - kept for backward compatibility
    donorInfo: {
        name: {
            type: String,
            required: false,
            trim: true
        },
        email: {
            type: String,
            required: false,
            trim: true,
            lowercase: true
        },
        mobile: {
            type: String,
            required: false,
            trim: true
        },
        address: {
            type: String,
            required: false,
            trim: true
        },
        panNumber: {
            type: String,
            trim: true,
            uppercase: true,
            validate: {
                validator: function (v) {
                    return !v || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
                },
                message: 'Invalid PAN number format'
            }
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
donationSchema.index({ memberId: 1, donationDate: -1 });
donationSchema.index({ status: 1, donationDate: -1 });
donationSchema.index({ donationId: 1 });
donationSchema.index({ transactionId: 1 });

// Virtual for formatted amount
donationSchema.virtual('formattedAmount').get(function () {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(this.amount);
});

// Virtual for formatted date
donationSchema.virtual('formattedDate').get(function () {
    return this.donationDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Static method to generate donation ID
donationSchema.statics.generateDonationId = async function () {
    const count = await this.countDocuments();
    const year = new Date().getFullYear();
    return `DON-${year}-${String(count + 1).padStart(4, '0')}`;
};

// Static method to get donations by member
donationSchema.statics.getByMemberId = function (memberId, options = {}) {
    const {
        status = null,
        limit = 50,
        sort = { donationDate: -1 }
    } = options;

    const query = { memberId };
    if (status) {
        query.status = status;
    }

    return this.find(query)
        .sort(sort)
        .limit(limit)
        .lean();
};

// Instance method to generate receipt
donationSchema.methods.generateReceipt = function () {
    if (!this.receiptNumber) {
        this.receiptNumber = `REC-${this.donationId}-${Date.now().toString().slice(-6)}`;
        this.receiptGenerated = true;
    }
    return this.receiptNumber;
};

// Pre-save middleware to set donorInfo from member data
donationSchema.pre('save', async function (next) {
    if (this.isNew && this.memberId && !this.donorInfo.name) {
        try {
            const Member = mongoose.model('Member');
            const member = await Member.findById(this.memberId);
            if (member) {
                this.donorInfo = {
                    name: member.name,
                    email: member.email,
                    mobile: member.mobile,
                    address: member.address
                };
            }
        } catch (error) {
            console.error('Error setting donor info:', error);
        }
    }
    next();
});

// Clear existing model to avoid OverwriteModelError
if (mongoose.models.Donation) {
    delete mongoose.models.Donation;
}

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
