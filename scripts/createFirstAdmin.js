#!/usr/bin/env node

/**
 * Script to create the first admin user for the Welfare Foundation
 * Usage: node scripts/createFirstAdmin.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/welfare-foundation';

// Member Schema (simplified for this script)
const memberSchema = new mongoose.Schema({
    memberName: { type: String, required: true },
    services: { type: String, default: 'Administration' },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoUrl: { type: String, default: 'https://via.placeholder.com/150' },
    photoPublicId: { type: String, default: 'admin_default' },
    membershipId: { type: String, unique: true },
    registrationDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: true },
    memberStatus: { 
        type: String, 
        enum: ['pending_verification', 'verified', 'suspended'], 
        default: 'verified' 
    },
    role: { 
        type: String, 
        enum: ['member', 'admin', 'super_admin'], 
        default: 'super_admin' 
    },
    isAdmin: { type: Boolean, default: true },
    adminPermissions: {
        viewAllDonations: { type: Boolean, default: true },
        manageMembers: { type: Boolean, default: true },
        manageSettings: { type: Boolean, default: true },
        generateReports: { type: Boolean, default: true }
    },
    referralCount: { type: Number, default: 0 }
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to ask questions
const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

// Helper function to ask for password (hidden input)
const askPassword = (question) => {
    return new Promise((resolve) => {
        process.stdout.write(question);
        process.stdin.setRawMode(true);
        process.stdin.resume();
        
        let password = '';
        process.stdin.on('data', (char) => {
            char = char.toString();
            
            if (char === '\n' || char === '\r' || char === '\u0004') {
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdout.write('\n');
                resolve(password);
            } else if (char === '\u0003') {
                process.exit();
            } else if (char === '\b' || char === '\u007f') {
                if (password.length > 0) {
                    password = password.slice(0, -1);
                    process.stdout.write('\b \b');
                }
            } else {
                password += char;
                process.stdout.write('*');
            }
        });
    });
};

// Main function to create admin
async function createFirstAdmin() {
    try {
        console.log('🚀 Creating First Admin for Welfare Foundation\n');
        
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        
        // Check if any admin already exists
        const existingAdmin = await Member.findOne({
            $or: [
                { role: 'admin' },
                { role: 'super_admin' },
                { isAdmin: true }
            ]
        });
        
        if (existingAdmin) {
            console.log('⚠️  An admin user already exists:');
            console.log(`   Name: ${existingAdmin.memberName}`);
            console.log(`   Email: ${existingAdmin.email}`);
            console.log(`   Role: ${existingAdmin.role}`);
            console.log(`   Member ID: ${existingAdmin.membershipId}\n`);
            
            const overwrite = await askQuestion('Do you want to create another admin? (y/N): ');
            if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
                console.log('Admin creation cancelled.');
                process.exit(0);
            }
        }
        
        // Collect admin information
        console.log('Please provide the following information for the admin user:\n');
        
        const adminName = await askQuestion('Admin Name: ');
        const adminEmail = await askQuestion('Admin Email: ');
        const adminMobile = await askQuestion('Admin Mobile (10 digits): ');
        const adminAddress = await askQuestion('Admin Address: ');
        const adminPassword = await askPassword('Admin Password (will be hidden): ');
        const confirmPassword = await askPassword('Confirm Password: ');
        
        // Validate inputs
        if (!adminName || !adminEmail || !adminMobile || !adminAddress || !adminPassword) {
            throw new Error('All fields are required');
        }
        
        if (adminPassword !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        if (!/^\d{10}$/.test(adminMobile)) {
            throw new Error('Mobile number must be 10 digits');
        }
        
        if (!/\S+@\S+\.\S+/.test(adminEmail)) {
            throw new Error('Please enter a valid email');
        }
        
        if (adminPassword.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        
        // Check if email already exists
        const existingMember = await Member.findOne({ email: adminEmail.toLowerCase() });
        if (existingMember) {
            throw new Error('A member with this email already exists');
        }
        
        // Generate admin membership ID
        const adminCount = await Member.countDocuments({
            $or: [{ role: 'admin' }, { role: 'super_admin' }, { isAdmin: true }]
        });
        const membershipId = `PSWF${new Date().getFullYear()}${String(adminCount + 1).padStart(4, '0')}`;
        
        // Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        
        // Create admin user
        const adminUser = new Member({
            memberName: adminName,
            services: 'Administration & Management',
            address: adminAddress,
            mobile: adminMobile,
            email: adminEmail.toLowerCase(),
            password: hashedPassword,
            photoUrl: 'https://via.placeholder.com/150?text=Admin',
            photoPublicId: 'admin_default',
            membershipId: membershipId,
            isVerified: true,
            memberStatus: 'verified',
            role: 'super_admin',
            isAdmin: true,
            adminPermissions: {
                viewAllDonations: true,
                manageMembers: true,
                manageSettings: true,
                generateReports: true
            }
        });
        
        await adminUser.save();
        
        console.log('\n✅ Admin user created successfully!');
        console.log('\n📋 Admin Details:');
        console.log(`   Name: ${adminUser.memberName}`);
        console.log(`   Email: ${adminUser.email}`);
        console.log(`   Mobile: ${adminUser.mobile}`);
        console.log(`   Member ID: ${adminUser.membershipId}`);
        console.log(`   Role: ${adminUser.role}`);
        console.log(`   Created: ${new Date().toLocaleString()}`);
        
        console.log('\n🔐 Login Instructions:');
        console.log('1. Go to /member/login');
        console.log(`2. Use email: ${adminUser.email}`);
        console.log('3. Use the password you just created');
        console.log('4. Access admin features from the dashboard');
        
        console.log('\n🎉 Setup complete! The admin can now manage the welfare foundation system.');
        
    } catch (error) {
        console.error('\n❌ Error creating admin:', error.message);
        process.exit(1);
    } finally {
        rl.close();
        mongoose.connection.close();
    }
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n\nAdmin creation cancelled.');
    rl.close();
    mongoose.connection.close();
    process.exit(0);
});

// Run the script
createFirstAdmin();
