import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true,
        trim: true
    },
    services: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Mobile number must be 10 digits'
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    photoUrl: {
        type: String,
        required: true
    },
    photoPublicId: {
        type: String,
        required: true
    },
    membershipId: {
        type: String,
        unique: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    memberStatus: {
        type: String,
        enum: ['pending_verification', 'verified', 'suspended'],
        default: 'pending_verification'
    },
    lastLoginAt: {
        type: Date
    },
    // Referral system fields
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        default: null
    },
    referredByMembershipId: {
        type: String,
        default: null
    },
    referralCount: {
        type: Number,
        default: 0
    },
    // Admin system fields
    role: {
        type: String,
        enum: ['member', 'admin', 'super_admin'],
        default: 'member'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    adminPermissions: {
        viewAllDonations: { type: Boolean, default: false },
        manageMembers: { type: Boolean, default: false },
        manageSettings: { type: Boolean, default: false },
        generateReports: { type: Boolean, default: false }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        default: null
    }
}, {
    timestamps: true
});

// Static method to get referred members
memberSchema.statics.getReferredMembers = function (memberId) {
    return this.find({ referredBy: memberId })
        .select('memberName email mobile membershipId registrationDate memberStatus')
        .sort({ registrationDate: -1 });
};

// Static method to update referral count
memberSchema.statics.updateReferralCount = async function (memberId) {
    const count = await this.countDocuments({ referredBy: memberId });
    await this.findByIdAndUpdate(memberId, { referralCount: count });
    return count;
};

// Clear any existing model to ensure we use the updated schema
if (mongoose.models.Member) {
    delete mongoose.models.Member;
}

export default mongoose.model('Member', memberSchema);
