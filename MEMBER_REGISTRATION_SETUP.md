# Member Registration API Setup

This project includes a complete member registration system with photo upload to Cloudinary and data storage in MongoDB.

## Features

- Member registration form with photo upload
- Photo upload to Cloudinary with automatic resizing
- Data validation and duplicate member checking
- Automatic membership ID generation
- Downloadable membership certificate
- Responsive design

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://yourip/db
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/welfare-foundation?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB on your machine
2. Start MongoDB service
3. Use the local connection string: `mongodb://127.0.0.1:27017/welfare-foundation`

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string and replace the placeholder in `.env.local`

### 3. Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Go to your dashboard
3. Copy the Cloud Name, API Key, and API Secret
4. Update the values in `.env.local`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

## API Endpoints

### POST /api/member/register

Registers a new member with photo upload.

**Request:** Form data with the following fields:
- `memberName` (required)
- `services` (optional)
- `address` (required)
- `mobile` (required, 10 digits)
- `email` (required)
- `password` (required, min 6 characters)
- `photo` (required, image file)

**Response:**
```json
{
  "success": true,
  "message": "Member registered successfully",
  "member": {
    "membershipId": "PSWF20251234",
    "memberName": "John Doe",
    "email": "john@example.com",
    "photoUrl": "https://res.cloudinary.com/...",
    "registrationDate": "2025-07-09T..."
  }
}
```

## Database Schema

### Member Model

```javascript
{
  memberName: String (required),
  services: String,
  address: String (required),
  mobile: String (required, 10 digits),
  email: String (required, unique),
  password: String (required, min 6 chars, hashed),
  photoUrl: String (required),
  photoPublicId: String (required),
  membershipId: String (unique, auto-generated),
  registrationDate: Date (default: now),
  isVerified: Boolean (default: false),
  memberStatus: String (enum: pending_verification, verified, suspended),
  lastLoginAt: Date,
  timestamps: true
}
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── member/
│   │       └── register/
│   │           └── route.js          # API endpoint
│   └── member/
│       └── register/
│           └── page.js               # Registration page
├── components/
│   └── member/
│       ├── MemberRegistrationForm.jsx
│       ├── MemberCertificate.jsx
│       └── OtpVerification.jsx
├── lib/
│   ├── mongodb.js                    # Database connection
│   └── cloudinary.js                 # Cloudinary configuration
└── models/
    └── Member.js                     # Member schema
```

## Usage

1. Navigate to `/member/register`
2. Fill out the registration form
3. Upload a photo (JPG, PNG, or GIF up to 5MB)
4. Complete OTP verification (if implemented)
5. Download the membership certificate

## Security Features

- File type validation for photo uploads
- File size limits (5MB)
- Data validation and sanitization
- Duplicate member prevention
- Automatic photo optimization via Cloudinary

## Error Handling

- Form validation with user-friendly error messages
- Cloudinary upload error handling
- Database connection error handling
- Automatic cleanup of uploaded photos on registration failure
