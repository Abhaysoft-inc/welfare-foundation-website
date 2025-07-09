import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        await dbConnect();

        const { email, password } = await request.json();

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find member
        const member = await Member.findOne({ 
            email: email.toLowerCase() 
        });

        if (!member) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        console.log('Member found:', {
            email: member.email,
            hasPassword: !!member.password,
            passwordType: typeof member.password,
            passwordLength: member.password ? member.password.length : 0
        });

        // Check if member has a password (for backward compatibility)
        if (!member.password) {
            return NextResponse.json(
                { 
                    error: 'Account needs password setup. Please contact administration or re-register.',
                    action: 'contact_admin'
                },
                { status: 400 }
            );
        }

        // Check if member is verified
        if (!member.isVerified) {
            return NextResponse.json(
                { 
                    error: 'Email not verified. Please verify your email first.',
                    action: 'verify_otp',
                    email: member.email,
                    memberName: member.memberName
                },
                { status: 403 }
            );
        }

        // Check if account is suspended
        if (member.memberStatus === 'suspended') {
            return NextResponse.json(
                { error: 'Account has been suspended. Please contact administration.' },
                { status: 403 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, member.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Update last login
        member.lastLoginAt = new Date();
        await member.save();

        // Return member data (excluding sensitive info)
        const memberData = {
            membershipId: member.membershipId,
            memberName: member.memberName,
            services: member.services,
            address: member.address,
            mobile: member.mobile,
            email: member.email,
            photoUrl: member.photoUrl,
            registrationDate: member.registrationDate,
            isVerified: member.isVerified,
            memberStatus: member.memberStatus,
            lastLoginAt: member.lastLoginAt
        };

        console.log(`Member logged in: ${member.email} (${member.membershipId})`);

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            member: memberData
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'Member login API endpoint' },
        { status: 200 }
    );
}
