# Email OTP Setup Guide

## Gmail SMTP Configuration

To use Gmail SMTP for sending OTP emails, follow these steps:

### 1. Enable 2-Factor Authentication

1. Go to your [Google Account](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the instructions to enable 2FA

### 2. Generate App Password

1. After enabling 2FA, go back to "Security"
2. Under "Signing in to Google", click on "App passwords"
3. Select "Mail" from the dropdown
4. Select "Other (Custom name)" and enter "Welfare Foundation Website"
5. Click "Generate"
6. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### 3. Update Environment Variables

Open your `.env.local` file and update:

```bash
# Email Configuration (Gmail SMTP)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=your_gmail@gmail.com
```

**Important:**
- Use your actual Gmail address for `EMAIL_USER` and `EMAIL_FROM`
- Use the 16-character App Password (not your regular Gmail password) for `EMAIL_PASS`
- Remove spaces from the App Password

### 4. Test the Configuration

1. Start your development server: `npm run dev`
2. Go to `/member/register`
3. Fill out the form and submit
4. Check if you receive the OTP email

## Alternative Email Providers

If you prefer not to use Gmail, you can modify the transporter in `src/lib/emailService.js`:

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransporter({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

### Custom SMTP
```javascript
const transporter = nodemailer.createTransporter({
    host: 'your-smtp-server.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use App Passwords** - Never use your main Gmail password
3. **Rotate passwords regularly** - Generate new App Passwords periodically
4. **Monitor email usage** - Check Gmail's "Sent" folder for sent emails

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**
   - Make sure 2FA is enabled
   - Use App Password, not regular password
   - Check email address is correct

2. **"Less secure app access" error**
   - This shouldn't happen with App Passwords
   - If it does, use App Passwords instead

3. **Emails not delivered**
   - Check spam folder
   - Verify email address is correct
   - Check Gmail's sent folder

4. **Rate limiting**
   - Gmail has sending limits (500 emails/day for free accounts)
   - For production, consider using dedicated email services

### Testing Email Configuration

You can test your email setup with this simple script:

```javascript
// test-email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_app_password'
    }
});

transporter.sendMail({
    from: 'your_email@gmail.com',
    to: 'test@example.com',
    subject: 'Test Email',
    text: 'This is a test email'
}, (error, info) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
```

Run with: `node test-email.js`

## Production Considerations

For production use, consider:

1. **Dedicated email service** like SendGrid, Mailgun, or SES
2. **Email templates** stored in database
3. **Email queue system** for high volume
4. **Bounce handling** and unsubscribe management
5. **SPF/DKIM/DMARC** records for better deliverability
