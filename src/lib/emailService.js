import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_FROM) {
        throw new Error('Email configuration missing. Please check EMAIL_USER, EMAIL_PASS, and EMAIL_FROM in .env.local');
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send OTP email
export const sendOTPEmail = async (email, otp, memberName = '') => {
    const transporter = createTransporter();

    const mailOptions = {
        from: {
            name: 'Pandit Sachidanand Welfare Foundation',
            address: process.env.EMAIL_FROM
        },
        to: email,
        subject: 'OTP Verification - Member Registration',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Verification</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #f97316, #22c55e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .otp-box { background: white; border: 2px dashed #f97316; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; }
                    .otp { font-size: 32px; font-weight: bold; color: #f97316; letter-spacing: 8px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
                    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🕉️ Pandit Sachidanand Welfare Foundation</div>
                        <h2>Email Verification Required</h2>
                    </div>
                    <div class="content">
                        <h3>Namaste ${memberName || 'Dear Member'}!</h3>
                        <p>Thank you for registering with Pandit Sachidanand Welfare Foundation. To complete your membership registration, please verify your email address.</p>
                        
                        <div class="otp-box">
                            <p><strong>Your OTP Code:</strong></p>
                            <div class="otp">${otp}</div>
                        </div>
                        
                        <p><strong>Important Notes:</strong></p>
                        <ul>
                            <li>This OTP is valid for <strong>10 minutes</strong> only</li>
                            <li>Please do not share this OTP with anyone</li>
                            <li>If you didn't request this, please ignore this email</li>
                        </ul>
                        
                        <p>Once verified, you'll be able to download your membership certificate and access all member benefits.</p>
                        
                        <p><strong>May this noble cause bring prosperity and peace to all.</strong></p>
                        
                        <div class="footer">
                            <p>🙏 With blessings,<br>
                            Pandit Sachidanand Welfare Foundation Team</p>
                            <p style="font-size: 12px; color: #999;">
                                This is an automated email. Please do not reply to this message.
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email send error:', error);
        throw error;
    }
};

// Send welcome email after successful registration
export const sendWelcomeEmail = async (email, memberData) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: {
            name: 'Pandit Sachidanand Welfare Foundation',
            address: process.env.EMAIL_FROM
        },
        to: email,
        subject: 'Welcome to Pandit Sachidanand Welfare Foundation!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to PSWF</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #f97316, #22c55e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .member-info { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #f97316; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
                    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🕉️ Pandit Sachidanand Welfare Foundation</div>
                        <h2>Welcome to Our Foundation!</h2>
                    </div>
                    <div class="content">
                        <h3>Namaste ${memberData.memberName}!</h3>
                        <p>🎉 Congratulations! Your membership registration has been successfully completed.</p>
                        
                        <div class="member-info">
                            <h4>Your Membership Details:</h4>
                            <p><strong>Membership ID:</strong> ${memberData.membershipId}</p>
                            <p><strong>Name:</strong> ${memberData.memberName}</p>
                            <p><strong>Registration Date:</strong> ${new Date(memberData.registrationDate).toLocaleDateString('en-IN')}</p>
                            <p><strong>Email:</strong> ${memberData.email}</p>
                        </div>
                        
                        <p><strong>What's Next?</strong></p>
                        <ul>
                            <li>Keep your Membership ID safe for future reference</li>
                            <li>You can download your membership certificate from our website</li>
                            <li>Stay connected for updates on our welfare activities</li>
                            <li>Participate in our community service programs</li>
                        </ul>
                        
                        <p>Together, we can make a positive impact in our community and serve those in need.</p>
                        
                        <div class="footer">
                            <p>🙏 With blessings,<br>
                            Pandit Sachidanand Welfare Foundation Team</p>
                            <p style="font-size: 12px; color: #999;">
                                This is an automated email. Please do not reply to this message.
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Welcome email send error:', error);
        throw error;
    }
};

// Send password reset OTP email
export const sendPasswordResetEmail = async (email, otp, memberName = '') => {
    const transporter = createTransporter();

    const mailOptions = {
        from: {
            name: 'Pandit Sachidanand Welfare Foundation',
            address: process.env.EMAIL_FROM
        },
        to: email,
        subject: 'Password Reset OTP - Pandit Sachidanand Welfare Foundation',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset OTP</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #dc2626, #f97316); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .otp-box { background: white; border: 2px dashed #dc2626; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; }
                    .otp { font-size: 32px; font-weight: bold; color: #dc2626; letter-spacing: 8px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
                    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                    .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; color: #856404; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🕉️ Pandit Sachidanand Welfare Foundation</div>
                        <p style="margin: 0; opacity: 0.9;">सेवा परमो धर्मः</p>
                    </div>
                    
                    <div class="content">
                        <h2 style="color: #dc2626; margin-bottom: 20px;">Password Reset Request</h2>
                        
                        ${memberName ? `<p>Dear <strong>${memberName}</strong>,</p>` : '<p>Dear Member,</p>'}
                        
                        <p>We received a request to reset your password. Please use the OTP below to continue with the password reset process:</p>
                        
                        <div class="otp-box">
                            <p style="margin: 0 0 10px 0; font-size: 16px; color: #666;">Your Password Reset OTP:</p>
                            <div class="otp">${otp}</div>
                            <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">Valid for 10 minutes</p>
                        </div>
                        
                        <div class="warning">
                            <strong>Security Notice:</strong> Never share your OTP with anyone. Our team will never ask for your OTP over phone or email. If you didn't request this password reset, please ignore this email.
                        </div>
                        
                        <p style="margin-top: 30px;">
                            If you have any questions or need assistance, please contact our support team.
                        </p>
                        
                        <div class="footer">
                            <p><strong>Pandit Sachidanand Welfare Foundation</strong></p>
                            <p>Serving Humanity with Compassion</p>
                            <p style="margin-top: 15px; font-size: 12px;">
                                This is an automated message. Please do not reply to this email.<br>
                                © 2025 Pandit Sachidanand Welfare Foundation. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Password reset email send error:', error);
        throw error;
    }
};
