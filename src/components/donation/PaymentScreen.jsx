"use client"
import { useState } from 'react';
import {
    CreditCardIcon,
    CheckIcon,
    RupeeIcon,
    ArrowLeftIcon,
    LotusIcon
} from '../icons';

export default function PaymentScreen({ donorData, onBack, isLoggedIn = false, memberData = null }) {
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [upiId, setUpiId] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [paymentResult, setPaymentResult] = useState(null);
    const [errors, setErrors] = useState({});

    const handleUpiChange = (e) => {
        setUpiId(e.target.value);
        if (errors.upiId) {
            setErrors({
                ...errors,
                upiId: ''
            });
        }
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value
                .replace(/\s/g, '')
                .replace(/[^0-9]/gi, '')
                .substring(0, 16);

            // Add spaces after every 4 digits
            const parts = [];
            for (let i = 0; i < formattedValue.length; i += 4) {
                parts.push(formattedValue.substring(i, i + 4));
            }
            formattedValue = parts.join(' ');
        }

        // Format expiry date (MM/YY)
        if (name === 'expiryDate') {
            formattedValue = value
                .replace(/[^0-9]/g, '')
                .substring(0, 4);

            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.substring(0, 2)}/${formattedValue.substring(2)}`;
            }
        }

        // Limit CVV to 3-4 digits
        if (name === 'cvv') {
            formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
        }

        setCardDetails({
            ...cardDetails,
            [name]: formattedValue
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validatePayment = () => {
        const newErrors = {};

        if (paymentMethod === 'upi') {
            if (!upiId.trim()) {
                newErrors.upiId = 'UPI ID is required';
            } else if (!upiId.includes('@')) {
                newErrors.upiId = 'Enter a valid UPI ID (e.g., name@upi)';
            }
        } else if (paymentMethod === 'card') {
            if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
                newErrors.cardNumber = 'Enter a valid 16-digit card number';
            }

            if (!cardDetails.cardName.trim()) {
                newErrors.cardName = 'Name on card is required';
            }

            if (!cardDetails.expiryDate || cardDetails.expiryDate.length < 5) {
                newErrors.expiryDate = 'Enter a valid expiry date (MM/YY)';
            } else {
                const [month, year] = cardDetails.expiryDate.split('/');
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;

                if (
                    parseInt(month) < 1 ||
                    parseInt(month) > 12 ||
                    parseInt(year) < currentYear ||
                    (parseInt(year) === currentYear && parseInt(month) < currentMonth)
                ) {
                    newErrors.expiryDate = 'Card has expired or date is invalid';
                }
            }

            if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
                newErrors.cvv = 'Enter a valid CVV/CVC';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (validatePayment()) {
            setIsProcessing(true);

            try {
                // Simulate payment gateway processing
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Mock payment response
                const mockPaymentResponse = {
                    transactionId: `TXN${Date.now()}`,
                    paymentId: `pay_${Math.random().toString(36).substring(2, 15)}`,
                    orderId: `order_${Math.random().toString(36).substring(2, 15)}`,
                    signature: `sig_${Math.random().toString(36).substring(2, 15)}`,
                    status: 'Completed',
                    paymentMode: paymentMethod === 'upi' ? 'UPI' : 'Credit Card'
                };

                // Process donation via API
                const donationResponse = await fetch('/api/donations/process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        donorData,
                        paymentData: mockPaymentResponse,
                        isLoggedIn,
                        memberId: memberData?._id
                    })
                });

                const result = await donationResponse.json();

                if (!donationResponse.ok) {
                    throw new Error(result.error || 'Payment processing failed');
                }

                setIsProcessing(false);
                setIsPaymentComplete(true);
                
                // Store payment result for success screen
                setPaymentResult(result);

            } catch (error) {
                console.error('Payment processing error:', error);
                setIsProcessing(false);
                setErrors({ 
                    payment: error.message || 'Payment failed. Please try again.' 
                });
            }
        }
    };

    // Format the donation amount with the Indian Rupee symbol
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(donorData.donationAmount);

    if (isPaymentComplete && paymentResult) {
        return (
            <div className="p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckIcon className="h-8 w-8 text-green-600" />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You for Your Donation!</h2>
                <p className="text-gray-600 mb-6">
                    {paymentResult.message}
                </p>

                {paymentResult.newMember && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-blue-800 mb-2">🎉 Welcome to Our Foundation!</h3>
                        <p className="text-sm text-blue-700 mb-2">
                            A member account has been created for you with ID: <strong>{paymentResult.member.memberId}</strong>
                        </p>
                        <p className="text-sm text-blue-700">
                            Check your email for login credentials to access your member dashboard.
                        </p>
                    </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4 mb-8 mx-auto max-w-sm border border-gray-200">
                    <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                        <span className="text-gray-600">Donation ID:</span>
                        <span className="font-medium">{paymentResult.donation.donationId}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">₹{paymentResult.donation.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                        <span className="text-gray-600">Purpose:</span>
                        <span className="font-medium">{paymentResult.donation.purpose}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium text-orange-600">{paymentResult.donation.transactionId}</span>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600">
                        A confirmation email has been sent to {donorData.email}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {paymentResult.newMember ? (
                            <button
                                onClick={() => window.location.href = '/member/login'}
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                Login to Your Account
                            </button>
                        ) : (
                            <button
                                onClick={() => window.location.href = '/member/dashboard'}
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                Go to Dashboard
                            </button>
                        )}
                        
                        <button
                            onClick={() => {
                                // Generate and download/print donation certificate
                                const donorName = donorData.fullName || memberData?.fullName || 'Donor Name';
                                const donationAmount = `₹${paymentResult.donation.amount.toLocaleString('en-IN')}`;
                                const donationId = paymentResult.donation.donationId;
                                const issuedDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

                                // Create print window with certificate
                                const printWindow = window.open('', '_blank', 'width=800,height=600');
                                printWindow.document.write(`
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                        <title>Donation Certificate & Receipt</title>
                                        <style>
                                            @page {
                                                size: A4 landscape;
                                                margin: 0;
                                            }
                                            
                                            * {
                                                box-sizing: border-box;
                                                -webkit-print-color-adjust: exact !important;
                                                print-color-adjust: exact !important;
                                            }
                                            
                                            body {
                                                margin: 0;
                                                padding: 20px;
                                                font-family: 'Arial', sans-serif;
                                                background: white;
                                            }
                                            
                                            .certificate {
                                                width: 100%;
                                                max-width: 950px;
                                                margin: 0 auto;
                                                border: 25px solid #10b981;
                                                position: relative;
                                                padding: 40px;
                                                background: white;
                                                min-height: 600px;
                                            }
                                            
                                            .certificate-header {
                                                text-align: center;
                                                margin-bottom: 30px;
                                            }
                                            
                                            .certificate-title {
                                                font-size: 36px;
                                                font-weight: bold;
                                                color: #10b981;
                                                margin: 10px 0;
                                            }
                                            
                                            .certificate-subtitle {
                                                font-size: 18px;
                                                color: #064e3b;
                                            }
                                            
                                            .certificate-body {
                                                margin: 20px 40px;
                                                text-align: center;
                                            }
                                            
                                            .donor-name {
                                                font-size: 26px;
                                                font-weight: bold;
                                                margin: 15px 0;
                                                color: #1e293b;
                                            }
                                            
                                            .certificate-text {
                                                font-size: 16px;
                                                line-height: 1.6;
                                                color: #334155;
                                            }
                                            
                                            .donation-amount {
                                                font-size: 28px;
                                                font-weight: bold;
                                                color: #10b981;
                                                margin: 20px 0;
                                                padding: 10px;
                                                display: inline-block;
                                                border: 2px solid #10b981;
                                                border-radius: 10px;
                                            }
                                            
                                            .certificate-footer {
                                                display: flex;
                                                justify-content: space-between;
                                                margin-top: 60px;
                                                padding: 0 20px;
                                            }
                                            
                                            .signature-box {
                                                text-align: center;
                                                width: 150px;
                                            }
                                            
                                            .signature-line {
                                                width: 150px;
                                                height: 1px;
                                                background: #94a3b8;
                                                margin: 10px auto;
                                            }
                                            
                                            .date-issued {
                                                text-align: right;
                                                margin-top: 20px;
                                                font-style: italic;
                                                color: #64748b;
                                            }
                                            
                                            .donation-id {
                                                margin-top: 10px;
                                                font-size: 14px;
                                                color: #64748b;
                                            }
                                            
                                            .tax-info {
                                                margin-top: 20px;
                                                padding: 10px;
                                                background-color: #f0fdf4;
                                                border: 1px solid #d1fae5;
                                                border-radius: 5px;
                                                text-align: center;
                                                font-size: 14px;
                                                color: #065f46;
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="certificate">
                                            <!-- Certificate Header -->
                                            <div class="certificate-header">
                                                <h1 class="certificate-title">Certificate of Donation</h1>
                                                <h2 class="certificate-subtitle">Pandit Sachidanand Welfare Foundation</h2>
                                            </div>
                                            
                                            <!-- Certificate Body -->
                                            <div class="certificate-body">
                                                <p class="certificate-text">
                                                    This is to certify that
                                                </p>
                                                <h2 class="donor-name">${donorName}</h2>
                                                
                                                <p class="certificate-text">
                                                    has generously donated
                                                </p>
                                                
                                                <div class="donation-amount">
                                                    ${donationAmount}
                                                </div>
                                                
                                                <p class="certificate-text">
                                                    to support the humanitarian initiatives of<br/>
                                                    <span style="font-weight: 600;">Pandit Sachidanand Welfare Foundation</span><br/>
                                                    Your contribution will help make a positive impact in our community.
                                                </p>
                                                
                                                <div class="donation-id">
                                                    Donation ID: ${donationId} | Payment Mode: Online
                                                </div>
                                                
                                                <div class="tax-info">
                                                    This donation may be eligible for tax benefits under applicable laws.
                                                </div>
                                            </div>
                                            
                                            <!-- Certificate Footer -->
                                            <div class="certificate-footer">
                                                <div class="signature-box">
                                                    <div class="signature-line"></div>
                                                    <p style="font-size: 14px; color: #64748b;">Donor's Signature</p>
                                                </div>
                                                
                                                <div class="signature-box">
                                                    <div class="signature-line"></div>
                                                    <p style="font-size: 14px; color: #64748b;">Authorized Signatory</p>
                                                </div>
                                            </div>
                                            
                                            <div class="date-issued">
                                                Issued on: ${issuedDate}
                                            </div>
                                        </div>
                                        
                                        <script>
                                            window.onload = function() {
                                                setTimeout(() => {
                                                    window.print();
                                                }, 500);
                                            }
                                        </script>
                                    </body>
                                    </html>
                                `);
                                printWindow.document.close();
                            }}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Download Certificate
                        </button>
                        
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8">
            <button
                onClick={onBack}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
            >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                <span>Back to donor details</span>
            </button>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <CreditCardIcon className="w-6 h-6 mr-2 text-orange-500" />
                    Payment Details
                </h2>
                <div className="text-lg font-medium text-orange-600">
                    {formattedAmount}
                </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-md p-4 mb-6">
                <div className="flex">
                    <div className="mr-3">
                        <LotusIcon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="text-sm text-orange-800">
                        {donorData.paymentType === 'one-time'
                            ? 'You are making a one-time donation to Pandit Sachidanand Welfare Foundation.'
                            : 'You are setting up a monthly recurring donation to Pandit Sachidanand Welfare Foundation.'}
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        type="button"
                        className={`py-3 px-4 border-b-2 font-medium text-sm ${paymentMethod === 'upi'
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setPaymentMethod('upi')}
                    >
                        UPI / QR Code
                    </button>
                    <button
                        type="button"
                        className={`ml-8 py-3 px-4 border-b-2 font-medium text-sm ${paymentMethod === 'card'
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        Card Payment
                    </button>
                </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
                {paymentMethod === 'upi' ? (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                                UPI ID / VPA
                            </label>
                            <input
                                type="text"
                                id="upiId"
                                value={upiId}
                                onChange={handleUpiChange}
                                placeholder="yourname@upi"
                                className={`block w-full px-3 py-2 border ${errors.upiId ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                            />
                            {errors.upiId && <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>}
                        </div>

                        <div className="flex justify-center py-4">
                            <div className="bg-gray-100 p-4 rounded-lg w-48 h-48 flex items-center justify-center">
                                <div className="text-center text-gray-500 text-sm">
                                    QR Code
                                    <div className="border-2 border-dashed border-gray-300 w-36 h-36 mt-2 rounded flex items-center justify-center">
                                        <span className="text-xs text-gray-400">Demo QR Image</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-center text-gray-500">
                            Scan with any UPI app or enter your UPI ID
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                                Card Number
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardChange}
                                    placeholder="1234 5678 9012 3456"
                                    className={`block w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                <div className="absolute right-3 top-2">
                                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            {errors.cardNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                                Name on Card
                            </label>
                            <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={cardDetails.cardName}
                                onChange={handleCardChange}
                                className={`block w-full px-3 py-2 border ${errors.cardName ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                            />
                            {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardChange}
                                    placeholder="MM/YY"
                                    className={`block w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                {errors.expiryDate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                    CVV / CVC
                                </label>
                                <input
                                    type="password"
                                    id="cvv"
                                    name="cvv"
                                    value={cardDetails.cvv}
                                    onChange={handleCardChange}
                                    placeholder="123"
                                    className={`block w-full px-3 py-2 border ${errors.cvv ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                            </div>
                        </div>
                    </div>
                )}

                {errors.payment && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm">{errors.payment}</p>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isProcessing
                            ? 'bg-orange-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                Complete {formattedAmount} {donorData.paymentType === 'one-time' ? 'Donation' : 'Monthly Donation'}
                            </>
                        )}
                    </button>
                </div>

                <div className="text-center text-xs text-gray-500 pt-2">
                    Your payment information is securely processed
                </div>
            </form>
        </div>
    );
}
            }
            formattedValue = parts.join(' ');
        }

        // Format expiry date (MM/YY)
        if (name === 'expiryDate') {
            formattedValue = value
                .replace(/[^0-9]/g, '')
                .substring(0, 4);

            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.substring(0, 2)}/${formattedValue.substring(2)}`;
            }
        }

        // Limit CVV to 3-4 digits
        if (name === 'cvv') {
            formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
        }

        setCardDetails({
            ...cardDetails,
            [name]: formattedValue
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validatePayment = () => {
        const newErrors = {};

        if (paymentMethod === 'upi') {
            if (!upiId.trim()) {
                newErrors.upiId = 'UPI ID is required';
            } else if (!upiId.includes('@')) {
                newErrors.upiId = 'Enter a valid UPI ID (e.g., name@upi)';
            }
        } else if (paymentMethod === 'card') {
            if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
                newErrors.cardNumber = 'Enter a valid 16-digit card number';
            }

            if (!cardDetails.cardName.trim()) {
                newErrors.cardName = 'Name on card is required';
            }

            if (!cardDetails.expiryDate || cardDetails.expiryDate.length < 5) {
                newErrors.expiryDate = 'Enter a valid expiry date (MM/YY)';
            } else {
                const [month, year] = cardDetails.expiryDate.split('/');
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;

                if (
                    parseInt(month) < 1 ||
                    parseInt(month) > 12 ||
                    parseInt(year) < currentYear ||
                    (parseInt(year) === currentYear && parseInt(month) < currentMonth)
                ) {
                    newErrors.expiryDate = 'Card has expired or date is invalid';
                }
            }

            if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
                newErrors.cvv = 'Enter a valid CVV/CVC';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (validatePayment()) {
            setIsProcessing(true);

            try {
                // Simulate payment gateway processing
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Mock payment response
                const mockPaymentResponse = {
                    transactionId: `TXN${Date.now()}`,
                    paymentId: `pay_${Math.random().toString(36).substring(2, 15)}`,
                    orderId: `order_${Math.random().toString(36).substring(2, 15)}`,
                    signature: `sig_${Math.random().toString(36).substring(2, 15)}`,
                    status: 'Completed',
                    paymentMode: paymentMethod === 'upi' ? 'UPI' : 'Credit Card'
                };

                // Process donation via API
                const donationResponse = await fetch('/api/donations/process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        donorData,
                        paymentData: mockPaymentResponse,
                        isLoggedIn,
                        memberId: memberData?._id
                    })
                });

                const result = await donationResponse.json();

                if (!donationResponse.ok) {
                    throw new Error(result.error || 'Payment processing failed');
                }

                setIsProcessing(false);
                setIsPaymentComplete(true);
                
                // Store payment result for success screen
                setPaymentResult(result);

            } catch (error) {
                console.error('Payment processing error:', error);
                setIsProcessing(false);
                setErrors({ 
                    payment: error.message || 'Payment failed. Please try again.' 
                });
            }
        }
    };

    // Format the donation amount with the Indian Rupee symbol
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(donorData.donationAmount);

    if (isPaymentComplete && paymentResult) {
        return (
            <div className="p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckIcon className="h-8 w-8 text-green-600" />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You for Your Donation!</h2>
                <p className="text-gray-600 mb-6">
                    {paymentResult.message}
                </p>

                {paymentResult.newMember && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-blue-800 mb-2">🎉 Welcome to Our Foundation!</h3>
                        <p className="text-sm text-blue-700 mb-2">
                            A member account has been created for you with ID: <strong>{paymentResult.member.memberId}</strong>
                        </p>
                        <p className="text-sm text-blue-700">
                            Check your email for login credentials to access your member dashboard.
                        </p>
                    </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4 mb-8 mx-auto max-w-sm border border-gray-200">
                    <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                        <span className="text-gray-600">Donation ID:</span>
                        <span className="font-medium">{paymentResult.donation.donationId}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">₹{paymentResult.donation.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                        <span className="text-gray-600">Purpose:</span>
                        <span className="font-medium">{paymentResult.donation.purpose}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium text-orange-600">{paymentResult.donation.transactionId}</span>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600">
                        A confirmation email has been sent to {donorData.email}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {paymentResult.newMember ? (
                            <button
                                onClick={() => window.location.href = '/member/login'}
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                Login to Your Account
                            </button>
                        ) : (
                            <button
                                onClick={() => window.location.href = '/member/dashboard'}
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                Go to Dashboard
                            </button>
                        )}
                        
                        <button
                            onClick={() => {
                                // Generate and download/print donation certificate
                                const donorName = donorData.fullName || memberData?.fullName || 'Donor Name';
                                const donationAmount = `₹${paymentResult.donation.amount.toLocaleString('en-IN')}`;
                                const paymentMode = 'Online';
                                const donationId = paymentResult.donation.donationId;
                                const issuedDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

                                // Create print window with certificate
                                const printWindow = window.open('', '_blank', 'width=800,height=600');
                                printWindow.document.write(`
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                        <title>Donation Certificate & Receipt</title>
                                        <style>
                                            @page {
                                                size: A4 landscape;
                                                margin: 0;
                                            }
                                            
                                            * {
                                                box-sizing: border-box;
                                                -webkit-print-color-adjust: exact !important;
                                                print-color-adjust: exact !important;
                                            }
                                            
                                            body {
                                                margin: 0;
                                                padding: 20px;
                                                font-family: 'Arial', sans-serif;
                                                background: white;
                                            }
                                            
                                            .certificate {
                                                width: 100%;
                                                max-width: 950px;
                                                margin: 0 auto;
                                                border: 25px solid #10b981;
                                                position: relative;
                                                padding: 40px;
                                                background: white;
                                                min-height: 600px;
                                            }
                                            
                                            .certificate-header {
                                                text-align: center;
                                                margin-bottom: 30px;
                                            }
                                            
                                            .certificate-title {
                                                font-size: 36px;
                                                font-weight: bold;
                                                color: #10b981;
                                                margin: 10px 0;
                                            }
                                            
                                            .certificate-subtitle {
                                                font-size: 18px;
                                                color: #064e3b;
                                            }
                                            
                                            .certificate-body {
                                                margin: 20px 40px;
                                                text-align: center;
                                            }
                                            
                                            .donor-name {
                                                font-size: 26px;
                                                font-weight: bold;
                                                margin: 15px 0;
                                                color: #1e293b;
                                            }
                                            
                                            .certificate-text {
                                                font-size: 16px;
                                                line-height: 1.6;
                                                color: #334155;
                                            }
                                            
                                            .donation-amount {
                                                font-size: 28px;
                                                font-weight: bold;
                                                color: #10b981;
                                                margin: 20px 0;
                                                padding: 10px;
                                                display: inline-block;
                                                border: 2px solid #10b981;
                                                border-radius: 10px;
                                            }
                                            
                                            .certificate-footer {
                                                display: flex;
                                                justify-content: space-between;
                                                margin-top: 60px;
                                                padding: 0 20px;
                                            }
                                            
                                            .signature-box {
                                                text-align: center;
                                                width: 150px;
                                            }
                                            
                                            .signature-line {
                                                width: 150px;
                                                height: 1px;
                                                background: #94a3b8;
                                                margin: 10px auto;
                                            }
                                            
                                            .date-issued {
                                                text-align: right;
                                                margin-top: 20px;
                                                font-style: italic;
                                                color: #64748b;
                                            }
                                            
                                            .donation-id {
                                                margin-top: 10px;
                                                font-size: 14px;
                                                color: #64748b;
                                            }
                                            
                                            .tax-info {
                                                margin-top: 20px;
                                                padding: 10px;
                                                background-color: #f0fdf4;
                                                border: 1px solid #d1fae5;
                                                border-radius: 5px;
                                                text-align: center;
                                                font-size: 14px;
                                                color: #065f46;
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="certificate">
                                            <!-- Certificate Header -->
                                            <div class="certificate-header">
                                                <h1 class="certificate-title">Certificate of Donation</h1>
                                                <h2 class="certificate-subtitle">Pandit Sachidanand Welfare Foundation</h2>
                                            </div>
                                            
                                            <!-- Certificate Body -->
                                            <div class="certificate-body">
                                                <p class="certificate-text">
                                                    This is to certify that
                                                </p>
                                                <h2 class="donor-name">${donorName}</h2>
                                                
                                                <p class="certificate-text">
                                                    has generously donated
                                                </p>
                                                
                                                <div class="donation-amount">
                                                    ${donationAmount}
                                                </div>
                                                
                                                <p class="certificate-text">
                                                    to support the humanitarian initiatives of<br/>
                                                    <span style="font-weight: 600;">Pandit Sachidanand Welfare Foundation</span><br/>
                                                    Your contribution will help make a positive impact in our community.
                                                </p>
                                                
                                                <div class="donation-id">
                                                    Donation ID: ${donationId} | Payment Mode: Online
                                                </div>
                                                
                                                <div class="tax-info">
                                                    This donation may be eligible for tax benefits under applicable laws.
                                                </div>
                                            </div>
                                            
                                            <!-- Certificate Footer -->
                                            <div class="certificate-footer">
                                                <div class="signature-box">
                                                    <div class="signature-line"></div>
                                                    <p style="font-size: 14px; color: #64748b;">Donor's Signature</p>
                                                </div>
                                                
                                                <div class="signature-box">
                                                    <div class="signature-line"></div>
                                                    <p style="font-size: 14px; color: #64748b;">Authorized Signatory</p>
                                                </div>
                                            </div>
                                            
                                            <div class="date-issued">
                                                Issued on: ${issuedDate}
                                            </div>
                                        </div>
                                        
                                        <script>
                                            window.onload = function() {
                                                setTimeout(() => {
                                                    window.print();
                                                }, 500);
                                            }
                                        </script>
                                    </body>
                                    </html>
                                `);
                                printWindow.document.close();
                            }}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Download Certificate
                        </button>
                        
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
                                const certificateContainer = document.createElement('div');
                                certificateContainer.style.display = 'none';
                                document.body.appendChild(certificateContainer);

                                // This approach uses a direct DOM manipulation which is not ideal in React
                                // but it allows us to reuse our certificate component without restructuring the app
                                const donationCertificate = document.createElement('div');
                                donationCertificate.id = 'donationCertificate';
                                certificateContainer.appendChild(donationCertificate);

                                // Use window.print for simplicity
                                // In a real app, you would use React's createRoot API
                                const printWindow = window.open('', '_blank', 'width=800,height=600');

                                // Get the photo URL if available
                                const donorName = donation.donorName || 'Donor Name';
                                const donationAmount = donation.amount ? `₹${donation.amount}` : '₹0';
                                const paymentMode = donation.paymentMode || 'Online';
                                const donationId = `PSWF-DON-${Math.random().toString(36).substring(2, 5).toUpperCase()}${Date.now().toString().slice(-6)}`;
                                const issuedDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

                                // Print certificate HTML
                                printWindow.document.write(`
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                        <title>Donation Certificate & Receipt</title>
                                        <style>
                                            @page {
                                                size: A4 landscape;
                                                margin: 0;
                                            }
                                            
                                            * {
                                                box-sizing: border-box;
                                                -webkit-print-color-adjust: exact !important;
                                                print-color-adjust: exact !important;
                                            }
                                            
                                            body {
                                                margin: 0;
                                                padding: 0;
                                                font-family: 'Arial', sans-serif;
                                                width: 100%;
                                                height: 100%;
                                                background: white;
                                            }
                                            
                                            .page {
                                                width: 100%;
                                                height: 100vh;
                                                page-break-after: always;
                                                position: relative;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                padding: 20px;
                                            }
                                            
                                            .certificate {
                                                width: 100%;
                                                height: 100%;
                                                max-width: 950px;
                                                margin: 0 auto;
                                                position: relative;
                                                background: white;
                                            }
                                            
                                            .certificate-container {
                                                border: 25px solid #10b981;
                                                height: 100%;
                                                position: relative;
                                                padding: 40px;
                                                box-sizing: border-box;
                                                background: linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), 
                                                            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                                            }
                                            
                                            .border-pattern {
                                                position: absolute;
                                                top: 10px;
                                                left: 10px;
                                                right: 10px;
                                                bottom: 10px;
                                                border: 2px solid #34d399;
                                                pointer-events: none;
                                            }
                                            
                                            .certificate-header {
                                                text-align: center;
                                                margin-bottom: 30px;
                                            }
                                            
                                            .certificate-title {
                                                font-size: 36px;
                                                font-weight: bold;
                                                color: #10b981;
                                                margin: 10px 0;
                                            }
                                            
                                            .certificate-subtitle {
                                                font-size: 18px;
                                                color: #064e3b;
                                            }
                                            
                                            .certificate-body {
                                                margin: 20px 40px;
                                                text-align: center;
                                            }
                                            
                                            .donor-name {
                                                font-size: 26px;
                                                font-weight: bold;
                                                margin: 15px 0;
                                                color: #1e293b;
                                            }
                                            
                                            .certificate-text {
                                                font-size: 16px;
                                                line-height: 1.6;
                                                color: #334155;
                                            }
                                            
                                            .donation-amount {
                                                font-size: 28px;
                                                font-weight: bold;
                                                color: #10b981;
                                                margin: 20px 0;
                                                padding: 10px;
                                                display: inline-block;
                                                border: 2px solid #10b981;
                                                border-radius: 10px;
                                            }
                                            
                                            .certificate-footer {
                                                display: flex;
                                                justify-content: space-between;
                                                margin-top: 60px;
                                                padding: 0 20px;
                                            }
                                            
                                            .signature-box {
                                                text-align: center;
                                                width: 150px;
                                            }
                                            
                                            .signature-line {
                                                width: 150px;
                                                height: 1px;
                                                background: #94a3b8;
                                                margin: 10px auto;
                                            }
                                            
                                            .date-issued {
                                                text-align: right;
                                                margin-top: 20px;
                                                font-style: italic;
                                                color: #64748b;
                                            }
                                            
                                            .certificate-seal {
                                                position: absolute;
                                                bottom: 40px;
                                                right: 40px;
                                                width: 120px;
                                                height: 120px;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                border-radius: 50%;
                                                border: 2px dashed #10b981;
                                            }
                                            
                                            .seal-inner {
                                                width: 100px;
                                                height: 100px;
                                                border-radius: 50%;
                                                border: 1px solid #10b981;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                opacity: 0.7;
                                            }
                                            
                                            .donation-id {
                                                margin-top: 10px;
                                                font-size: 14px;
                                                color: #64748b;
                                            }
                                            
                                            .watermark {
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                width: 100%;
                                                height: 100%;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                opacity: 0.03;
                                                z-index: -1;
                                            }
                                            
                                            .tax-info {
                                                margin-top: 20px;
                                                padding: 10px;
                                                background-color: #f0fdf4;
                                                border: 1px solid #d1fae5;
                                                border-radius: 5px;
                                                text-align: center;
                                                font-size: 14px;
                                                color: #065f46;
                                            }
                                            
                                            .indian-pattern {
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                width: 100%;
                                                height: 15px;
                                                background: linear-gradient(90deg, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%);
                                                opacity: 0.8;
                                            }
                                            
                                            @media print {
                                                html, body {
                                                    width: 100%;
                                                    height: 100%;
                                                    margin: 0;
                                                    padding: 0;
                                                }
                                                
                                                .certificate {
                                                    box-shadow: none;
                                                    margin: 0;
                                                }
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="page">
                                            <div class="certificate">
                                                <div class="certificate-container">
                                                    <!-- Indian Pattern -->
                                                    <div class="indian-pattern"></div>
                                                    
                                                    <!-- Border Pattern -->
                                                    <div class="border-pattern"></div>
                                                    
                                                    <!-- Watermark -->
                                                    <div class="watermark">
                                                        <svg class="rupee-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                                            <path d="M6 3h12M6 8h12M13 21V8M6 13h8a4 4 0 004-4"></path>
                                                        </svg>
                                                    </div>
                                                    
                                                    <!-- Certificate Header -->
                                                    <div class="certificate-header">
                                                        <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 10px;">
                                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M12 2c3 3 3 7.5 0 10.5 3-3 3-7.5 0-10.5Z"></path>
                                                                <path d="M12 2c-3 3-3 7.5 0 10.5 -3-3-3-7.5 0-10.5Z"></path>
                                                                <path d="M12 2c0 5 4 10 8 12-4-2-8-7-8-12Z"></path>
                                                                <path d="M12 2c0 5-4 10-8 12 4-2 8-7 8-12Z"></path>
                                                                <path d="M12 22c3-3 6-3 9-6-3 3-6 3-9 6Z"></path>
                                                                <path d="M12 22c-3-3-6-3-9-6 3 3 6 3 9 6Z"></path>
                                                            </svg>
                                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M6 3h12M6 8h12M13 21V8M6 13h8a4 4 0 004-4"></path>
                                                            </svg>
                                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M12 2c3 3 3 7.5 0 10.5 3-3 3-7.5 0-10.5Z"></path>
                                                                <path d="M12 2c-3 3-3 7.5 0 10.5 -3-3-3-7.5 0-10.5Z"></path>
                                                                <path d="M12 2c0 5 4 10 8 12-4-2-8-7-8-12Z"></path>
                                                                <path d="M12 2c0 5-4 10-8 12 4-2 8-7 8-12Z"></path>
                                                                <path d="M12 22c3-3 6-3 9-6-3 3-6 3-9 6Z"></path>
                                                                <path d="M12 22c-3-3-6-3-9-6 3 3 6 3 9 6Z"></path>
                                                            </svg>
                                                        </div>
                                                        <h1 class="certificate-title">Certificate of Donation</h1>
                                                        <h2 class="certificate-subtitle">Pandit Sachidanand Welfare Foundation</h2>
                                                    </div>
                                                    
                                                    <!-- Certificate Body -->
                                                    <div class="certificate-body">
                                                        <p class="certificate-text">
                                                            This is to certify that
                                                        </p>
                                                        <h2 class="donor-name">${donorName}</h2>
                                                        
                                                        <p class="certificate-text">
                                                            has generously donated
                                                        </p>
                                                        
                                                        <div class="donation-amount">
                                                            ${donationAmount}
                                                        </div>
                                                        
                                                        <p class="certificate-text">
                                                            to support the humanitarian initiatives of<br/>
                                                            <span style="font-weight: 600;">Pandit Sachidanand Welfare Foundation</span><br/>
                                                            Your contribution will help make a positive impact in our community.
                                                        </p>
                                                        
                                                        <div class="donation-id">
                                                            Donation ID: ${donationId} | Payment Mode: ${paymentMode}
                                                        </div>
                                                        
                                                        <div class="tax-info">
                                                            This donation may be eligible for tax benefits under applicable laws.
                                                        </div>
                                                    </div>
                                                    
                                                    <!-- Certificate Footer -->
                                                    <div class="certificate-footer">
                                                        <div class="signature-box">
                                                            <div class="signature-line"></div>
                                                            <p style="font-size: 14px; color: #64748b;">Donor's Signature</p>
                                                        </div>
                                                        
                                                        <div class="signature-box">
                                                            <div class="signature-line"></div>
                                                            <p style="font-size: 14px; color: #64748b;">Authorized Signatory</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="date-issued">
                                                        Issued on: ${issuedDate}
                                                    </div>
                                                    
                                                    <!-- Certificate Seal -->
                                                    <div class="certificate-seal">
                                                        <div class="seal-inner">
                                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M12 2c3 3 3 7.5 0 10.5 3-3 3-7.5 0-10.5Z"></path>
                                                                <path d="M12 2c-3 3-3 7.5 0 10.5 -3-3-3-7.5 0-10.5Z"></path>
                                                                <path d="M12 2c0 5 4 10 8 12-4-2-8-7-8-12Z"></path>
                                                                <path d="M12 2c0 5-4 10-8 12 4-2 8-7 8-12Z"></path>
                                                                <path d="M12 22c3-3 6-3 9-6-3 3-6 3-9 6Z"></path>
                                                                <path d="M12 22c-3-3-6-3-9-6 3 3 6 3 9 6Z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <script>
                                            window.onload = function() {
                                                setTimeout(() => {
                                                    window.print();
                                                }, 500);
                                            }
                                        </script>
                                    </body>
                                    </html>
                                `);

                                printWindow.document.close();
                            }}
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded shadow-md transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Receipt
                        </button>

                        <a
                            href="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Return to Homepage
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8">
            <button
                onClick={onBack}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
            >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                <span>Back to donor details</span>
            </button>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <CreditCardIcon className="w-6 h-6 mr-2 text-orange-500" />
                    Payment Details
                </h2>
                <div className="text-lg font-medium text-orange-600">
                    {formattedAmount}
                </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-md p-4 mb-6">
                <div className="flex">
                    <div className="mr-3">
                        <LotusIcon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="text-sm text-orange-800">
                        {donorData.paymentType === 'one-time'
                            ? 'You are making a one-time donation to Pandit Sachidanand Welfare Foundation.'
                            : 'You are setting up a monthly recurring donation to Pandit Sachidanand Welfare Foundation.'}
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        type="button"
                        className={`py-3 px-4 border-b-2 font-medium text-sm ${paymentMethod === 'upi'
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setPaymentMethod('upi')}
                    >
                        UPI / QR Code
                    </button>
                    <button
                        type="button"
                        className={`ml-8 py-3 px-4 border-b-2 font-medium text-sm ${paymentMethod === 'card'
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        Card Payment
                    </button>
                </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
                {paymentMethod === 'upi' ? (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                                UPI ID / VPA
                            </label>
                            <input
                                type="text"
                                id="upiId"
                                value={upiId}
                                onChange={handleUpiChange}
                                placeholder="yourname@upi"
                                className={`block w-full px-3 py-2 border ${errors.upiId ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                            />
                            {errors.upiId && <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>}
                        </div>

                        <div className="flex justify-center py-4">
                            <div className="bg-gray-100 p-4 rounded-lg w-48 h-48 flex items-center justify-center">
                                <div className="text-center text-gray-500 text-sm">
                                    QR Code
                                    <div className="border-2 border-dashed border-gray-300 w-36 h-36 mt-2 rounded flex items-center justify-center">
                                        <span className="text-xs text-gray-400">Demo QR Image</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-center text-gray-500">
                            Scan with any UPI app or enter your UPI ID
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                                Card Number
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardChange}
                                    placeholder="1234 5678 9012 3456"
                                    className={`block w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                <div className="absolute right-3 top-2">
                                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            {errors.cardNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                                Name on Card
                            </label>
                            <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={cardDetails.cardName}
                                onChange={handleCardChange}
                                className={`block w-full px-3 py-2 border ${errors.cardName ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                            />
                            {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardChange}
                                    placeholder="MM/YY"
                                    className={`block w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                {errors.expiryDate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                    CVV / CVC
                                </label>
                                <input
                                    type="password"
                                    id="cvv"
                                    name="cvv"
                                    value={cardDetails.cvv}
                                    onChange={handleCardChange}
                                    placeholder="123"
                                    className={`block w-full px-3 py-2 border ${errors.cvv ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isProcessing
                            ? 'bg-orange-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                Complete {formattedAmount} {donorData.paymentType === 'one-time' ? 'Donation' : 'Monthly Donation'}
                            </>
                        )}
                    </button>
                </div>

                <div className="text-center text-xs text-gray-500 pt-2">
                    Your payment information is securely processed
                </div>
            </form>
        </div>
    );
}
