import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    otp: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true,
        enum: ['member_registration', 'password_reset']
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    attempts: {
        type: Number,
        default: 0,
        max: 3
    },
    verified: {
        type: Boolean,
        default: false
    },
    verifiedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for automatic deletion of expired documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for quick lookup
otpSchema.index({ email: 1, purpose: 1 });

export default mongoose.models.OTP || mongoose.model('OTP', otpSchema);
