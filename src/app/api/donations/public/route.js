import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { sendDonationEmail } from '@/lib/emailService';

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const {
            donorName,
            donorEmail,
            donorPhone,
            donorAddress,
            donorPan,
            amount,
            purpose,
            paymentMode,
            transactionId,
            orderId,
            paymentId,
            signature
        } = body;

        // Validate required fields
        if (!donorName || !donorEmail || !donorPhone || !amount || !purpose) {
            return NextResponse.json(
                { error: 'Missing required fields: donorName, donorEmail, donorPhone, amount, purpose' },
                { status: 400 }
            );
        }

        // Validate amount
        if (amount < 1 || !Number.isInteger(Number(amount))) {
            return NextResponse.json(
                { error: 'Amount must be a positive integer' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(donorEmail)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate phone format (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(donorPhone)) {
            return NextResponse.json(
                { error: 'Phone number must be 10 digits' },
                { status: 400 }
            );
        }

        // Generate donation ID
        const donationId = await Donation.generateDonationId();

        // Create donation record (public donation - no memberId)
        const donation = new Donation({
            memberId: null, // No member account required
            donationId,
            amount: Number(amount),
            purpose: purpose.trim(),
            paymentMode: paymentMode || 'Online',
            transactionId: transactionId || donationId,
            status: 'Completed',
            donationDate: new Date(),
            receiptGenerated: true,
            taxBenefit: true,
            gatewayOrderId: orderId,
            gatewayPaymentId: paymentId,
            gatewaySignature: signature,
            campaign: purpose.trim(),
            // Direct donor fields
            donorName: donorName.trim(),
            donorEmail: donorEmail.trim().toLowerCase(),
            donorPhone: donorPhone.trim(),
            donorAddress: donorAddress ? donorAddress.trim() : '',
            donorPan: donorPan ? donorPan.trim().toUpperCase() : '',
            // Legacy donorInfo field for backward compatibility
            donorInfo: {
                name: donorName.trim(),
                email: donorEmail.trim().toLowerCase(),
                mobile: donorPhone.trim(),
                address: donorAddress ? donorAddress.trim() : '',
                panNumber: donorPan ? donorPan.trim().toUpperCase() : ''
            }
        });

        // Save donation
        await donation.save();

        // Send donation receipt and certificate via email
        let emailSent = false;
        try {
            const emailResult = await sendDonationEmail(donation);
            if (emailResult.success) {
                console.log('Donation email sent successfully:', emailResult.messageId);
                emailSent = true;
            } else {
                console.error('Failed to send donation email:', emailResult.error);
            }
        } catch (emailError) {
            console.error('Error sending donation email:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: 'Donation processed successfully',
            donation: {
                donationId: donation.donationId,
                amount: donation.amount,
                purpose: donation.purpose,
                donorName: donation.donorName,
                donorEmail: donation.donorEmail,
                donationDate: donation.donationDate,
                status: donation.status,
                emailSent
            }
        });

    } catch (error) {
        console.error('Error processing public donation:', error);

        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json(
                { error: 'Validation failed', details: errorMessages },
                { status: 400 }
            );
        }

        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Duplicate donation detected. Please try again.' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                error: 'Failed to process donation',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
