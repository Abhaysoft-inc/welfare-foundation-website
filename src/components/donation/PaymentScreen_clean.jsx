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

    const formatAmount = (amount) => {
        const num = parseFloat(amount);
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(num);
    };

    const formattedAmount = formatAmount(donorData.amount);

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
                    newErrors.expiryDate = 'Card has expired or invalid date';
                }
            }

            if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
                newErrors.cvv = 'Enter a valid CVV';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (!validatePayment()) {
            return;
        }

        setIsProcessing(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Prepare donation data
            const donationPayload = {
                ...donorData,
                paymentMethod,
                paymentDetails: paymentMethod === 'upi' ? { upiId } : cardDetails,
                isLoggedIn,
                memberData
            };

            // Call the donation processing API
            const response = await fetch('/api/donations/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationPayload),
            });

            const result = await response.json();

            if (response.ok) {
                setPaymentResult(result);
                setIsPaymentComplete(true);
            } else {
                throw new Error(result.error || 'Payment processing failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setErrors({ payment: error.message || 'Payment failed. Please try again.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadCertificate = () => {
        const donorName = memberData?.name || donorData.donorName || 'Anonymous Donor';
        const donationAmount = formattedAmount;
        const donationId = paymentResult?.donation?.donationId || 'N/A';
        const issuedDate = new Date().toLocaleDateString('en-IN');

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Donation Certificate</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Georgia', serif;
                        background: linear-gradient(135deg, #fef7cd 0%, #fff4e6 100%);
                        padding: 40px 20px;
                        min-height: 100vh;
                    }
                    
                    .certificate {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        padding: 60px;
                        border: 12px solid #f97316;
                        border-radius: 20px;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .certificate::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 8px;
                        background: linear-gradient(90deg, #f97316, #ea580c, #dc2626, #ea580c, #f97316);
                    }
                    
                    .certificate-header {
                        text-align: center;
                        margin-bottom: 40px;
                        border-bottom: 3px solid #f97316;
                        padding-bottom: 30px;
                    }
                    
                    .organization-name {
                        font-size: 32px;
                        font-weight: bold;
                        color: #f97316;
                        margin-bottom: 8px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                    }
                    
                    .certificate-title {
                        font-size: 24px;
                        color: #64748b;
                        font-style: italic;
                        margin-bottom: 15px;
                    }
                    
                    .certificate-body {
                        text-align: center;
                        line-height: 1.8;
                    }
                    
                    .certificate-text {
                        font-size: 18px;
                        color: #374151;
                        margin: 15px 0;
                    }
                    
                    .donor-name {
                        font-size: 36px;
                        font-weight: bold;
                        color: #1f2937;
                        margin: 25px 0;
                        padding: 15px 30px;
                        border: 2px solid #f97316;
                        border-radius: 10px;
                        background: #fef7cd;
                        display: inline-block;
                    }
                    
                    .donation-amount {
                        font-size: 28px;
                        font-weight: bold;
                        color: #dc2626;
                        margin: 25px 0;
                        padding: 15px 30px;
                        background: #fee2e2;
                        border: 2px solid #dc2626;
                        border-radius: 10px;
                        display: inline-block;
                    }
                    
                    .donation-id {
                        font-size: 14px;
                        color: #6b7280;
                        margin: 20px 0;
                        padding: 10px;
                        background: #f3f4f6;
                        border-radius: 5px;
                        border-left: 4px solid #f97316;
                    }
                    
                    .tax-info {
                        font-size: 12px;
                        color: #9ca3af;
                        font-style: italic;
                        margin-top: 20px;
                    }
                    
                    .certificate-footer {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 50px;
                        padding-top: 30px;
                        border-top: 2px solid #e5e7eb;
                    }
                    
                    .signature-box {
                        text-align: center;
                        width: 200px;
                    }
                    
                    .signature-line {
                        height: 2px;
                        background: #374151;
                        margin-bottom: 10px;
                    }
                    
                    .date-issued {
                        text-align: center;
                        margin-top: 30px;
                        font-size: 14px;
                        color: #6b7280;
                        padding: 10px;
                        border: 1px solid #d1d5db;
                        border-radius: 5px;
                        background: #f9fafb;
                    }
                    
                    @media print {
                        body {
                            background: white;
                            padding: 0;
                        }
                        
                        .certificate {
                            box-shadow: none;
                            border: 8px solid #f97316;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="certificate">
                    <!-- Certificate Header -->
                    <div class="certificate-header">
                        <h1 class="organization-name">Pandit Sachidanand Welfare Foundation</h1>
                        <p class="certificate-title">Certificate of Appreciation</p>
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
    };

    // Success Screen
    if (isPaymentComplete && paymentResult) {
        const donorName = memberData?.name || donorData.donorName || 'Anonymous Donor';

        return (
            <div className="p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckIcon className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
                        <p className="text-gray-600">Your donation has been processed successfully</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Donor Name:</span>
                                <p className="font-medium">{donorName}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Amount:</span>
                                <p className="font-medium text-green-600">{formattedAmount}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Donation ID:</span>
                                <p className="font-medium">{paymentResult.donation?.donationId}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Payment Method:</span>
                                <p className="font-medium capitalize">{paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="font-medium text-blue-900 mb-2">What's Next?</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• A confirmation email has been sent to your email address</li>
                            {!isLoggedIn && (
                                <li>• Check your email for login credentials to access your donor dashboard</li>
                            )}
                            <li>• You can download your donation certificate below</li>
                            <li>• Your donation is eligible for tax benefits under 80G</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={downloadCertificate}
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

    // Payment Form
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
                    <div>
                        <h3 className="text-sm font-medium text-orange-800">
                            Your contribution makes a difference
                        </h3>
                        <p className="text-sm text-orange-700 mt-1">
                            This donation will help support our welfare initiatives and community programs.
                        </p>
                    </div>
                </div>
            </div>

            {errors.payment && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <p className="text-sm text-red-600">{errors.payment}</p>
                </div>
            )}

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div>
                    <label className="text-base font-medium text-gray-900">Payment Method</label>
                    <p className="text-sm leading-5 text-gray-500">Choose your preferred payment option</p>
                    <fieldset className="mt-4">
                        <legend className="sr-only">Payment method</legend>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="upi"
                                    name="payment-method"
                                    type="radio"
                                    checked={paymentMethod === 'upi'}
                                    onChange={() => setPaymentMethod('upi')}
                                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                                />
                                <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">
                                    UPI Payment
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="card"
                                    name="payment-method"
                                    type="radio"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                                />
                                <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                                    Credit/Debit Card
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                {paymentMethod === 'upi' && (
                    <div>
                        <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700">
                            UPI ID
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="upi-id"
                                value={upiId}
                                onChange={handleUpiChange}
                                placeholder="yourname@upi"
                                className={`block w-full px-3 py-2 border ${errors.upiId ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500`}
                            />
                            {errors.upiId && <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>}
                        </div>
                    </div>
                )}

                {paymentMethod === 'card' && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                Card Number
                            </label>
                            <input
                                type="text"
                                id="card-number"
                                name="cardNumber"
                                value={cardDetails.cardNumber}
                                onChange={handleCardChange}
                                placeholder="1234 5678 9012 3456"
                                className={`block w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                            />
                            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                        </div>

                        <div>
                            <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">
                                Name on Card
                            </label>
                            <input
                                type="text"
                                id="card-name"
                                name="cardName"
                                value={cardDetails.cardName}
                                onChange={handleCardChange}
                                placeholder="John Doe"
                                className={`block w-full px-3 py-2 border ${errors.cardName ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                            />
                            {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiry-date"
                                    name="expiryDate"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardChange}
                                    placeholder="MM/YY"
                                    className={`block w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
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
