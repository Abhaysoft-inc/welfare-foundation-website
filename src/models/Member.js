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
    }
}, {
    timestamps: true
});

// Clear any existing model to ensure we use the updated schema
if (mongoose.models.Member) {
    delete mongoose.models.Member;
}

export default mongoose.model('Member', memberSchema);
