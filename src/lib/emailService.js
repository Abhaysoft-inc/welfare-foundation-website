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

// Generic email sending function
export const sendEmail = async (email, subject, htmlContent) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: {
            name: 'Pandit Sachidanand Welfare Foundation',
            address: process.env.EMAIL_FROM
        },
        to: email,
        subject: subject,
        html: htmlContent
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

// Generate donation receipt HTML
const generateDonationReceiptHTML = (donation) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Donation Receipt</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 16px; opacity: 0.9; }
            .content { padding: 30px; }
            .receipt-box { background: #f8f9fa; border-left: 4px solid #ff6b35; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #555; }
            .detail-value { color: #333; }
            .amount-highlight { font-size: 24px; font-weight: bold; color: #ff6b35; text-align: center; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .thank-you { font-size: 18px; color: #ff6b35; font-weight: bold; text-align: center; margin: 20px 0; }
            .tax-note { background: #e8f4fd; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🪷 Prashant Seva Welfare Foundation</div>
                <div class="subtitle">Tax Deductible Donation Receipt</div>
            </div>
            
            <div class="content">
                <div class="thank-you">Thank you for your generous donation!</div>
                
                <div class="receipt-box">
                    <h3 style="margin-top: 0; color: #ff6b35;">Receipt Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Receipt Number:</span>
                        <span class="detail-value">${donation.receiptNumber || donation.donationId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Donation ID:</span>
                        <span class="detail-value">${donation.donationId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value">${new Date(donation.donationDate).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Donor Name:</span>
                        <span class="detail-value">${donation.donorName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Purpose:</span>
                        <span class="detail-value">${donation.purpose}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Payment Mode:</span>
                        <span class="detail-value">${donation.paymentMode}</span>
                    </div>
                    ${donation.transactionId ? `
                    <div class="detail-row">
                        <span class="detail-label">Transaction ID:</span>
                        <span class="detail-value">${donation.transactionId}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="amount-highlight">
                    Amount Donated: ₹${donation.amount.toLocaleString('en-IN')}
                </div>
                
                <div class="tax-note">
                    <strong>📋 Tax Benefits:</strong><br>
                    This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. 
                    Please retain this receipt for your tax filing purposes.
                </div>
            </div>
            
            <div class="footer">
                <p>This is an automatically generated receipt.</p>
                <p>Prashant Seva Welfare Foundation | Email: info@prashantsevaadmin.com</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

// Generate donation certificate HTML
const generateDonationCertificateHTML = (donation) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Donation Certificate</title>
        <style>
            body { font-family: 'Georgia', serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .certificate { max-width: 800px; margin: 0 auto; background: white; border: 8px solid #ff6b35; padding: 40px; text-align: center; position: relative; }
            .certificate::before { content: ''; position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 2px solid #f7931e; }
            .logo { font-size: 32px; margin-bottom: 20px; }
            .title { font-size: 36px; font-weight: bold; color: #ff6b35; margin: 20px 0; text-transform: uppercase; letter-spacing: 2px; }
            .content { font-size: 18px; line-height: 1.8; color: #333; margin: 30px 0; }
            .name { font-size: 28px; font-weight: bold; color: #ff6b35; margin: 20px 0; text-decoration: underline; }
            .amount { font-size: 24px; font-weight: bold; color: #333; margin: 20px 0; }
            .signature { margin-top: 50px; display: flex; justify-content: space-between; }
            .sig-line { border-top: 2px solid #333; width: 200px; padding-top: 10px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="logo">🪷</div>
            <h1 style="font-size: 24px; color: #333; margin: 0;">PRASHANT SEVA WELFARE FOUNDATION</h1>
            
            <div class="title">Certificate of Appreciation</div>
            
            <div class="content">This certificate is presented to</div>
            <div class="name">${donation.donorName}</div>
            <div class="content">in grateful recognition of your generous donation of</div>
            <div class="amount">₹${donation.amount.toLocaleString('en-IN')}</div>
            <div class="content">towards <strong>${donation.purpose}</strong>.</div>
            
            <div class="content">
                <strong>Donation ID:</strong> ${donation.donationId}<br>
                <strong>Date:</strong> ${new Date(donation.donationDate).toLocaleDateString('en-IN')}
            </div>
            
            <div class="signature">
                <div class="sig-line">Authorized Signatory</div>
                <div class="sig-line">President</div>
            </div>
        </div>
    </body>
    </html>
    `;
};

// Send donation receipt and certificate via email
export const sendDonationEmail = async (donation) => {
    try {
        const transporter = createTransporter();

        // Generate HTML content
        const receiptHTML = generateDonationReceiptHTML(donation);
        const certificateHTML = generateDonationCertificateHTML(donation);

        const mailOptions = {
            from: {
                name: 'Prashant Seva Welfare Foundation',
                address: process.env.EMAIL_FROM
            },
            to: donation.donorEmail,
            subject: `Thank you for your donation! Receipt & Certificate - ${donation.donationId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ff6b35;">🙏 Thank you for your generous donation!</h2>
                    
                    <p>Dear ${donation.donorName},</p>
                    
                    <p>We are deeply grateful for your donation of <strong>₹${donation.amount.toLocaleString('en-IN')}</strong> 
                    towards <strong>${donation.purpose}</strong>.</p>
                    
                    <p><strong>Donation Details:</strong></p>
                    <ul>
                        <li>Donation ID: ${donation.donationId}</li>
                        <li>Amount: ₹${donation.amount.toLocaleString('en-IN')}</li>
                        <li>Date: ${new Date(donation.donationDate).toLocaleDateString('en-IN')}</li>
                        <li>Purpose: ${donation.purpose}</li>
                    </ul>
                    
                    <p><strong>Tax Benefits:</strong><br>
                    Your donation is eligible for tax deduction under Section 80G. 
                    Please find attached your official receipt and certificate.</p>
                    
                    <p>With sincere gratitude,<br>
                    <strong>Prashant Seva Welfare Foundation</strong></p>
                </div>
            `,
            attachments: [
                {
                    filename: `Donation_Receipt_${donation.donationId}.html`,
                    content: receiptHTML,
                    contentType: 'text/html'
                },
                {
                    filename: `Donation_Certificate_${donation.donationId}.html`,
                    content: certificateHTML,
                    contentType: 'text/html'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Donation email sent successfully:', info.messageId);
        
        return {
            success: true,
            messageId: info.messageId
        };

    } catch (error) {
        console.error('Error sending donation email:', error);
        return {
            success: false,
            error: error.message
        };
    }
};
