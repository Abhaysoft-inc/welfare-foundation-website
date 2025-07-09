"use client";
import React, { useState } from 'react';

export default function DonationHistory({ donations, memberData, onRefresh }) {
    const [selectedDonation, setSelectedDonation] = useState(null);

    const generateInvoice = (donation) => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        const donorName = memberData?.memberName || 'Donor Name';
        const donorEmail = memberData?.email || 'email@example.com';
        const donorMobile = memberData?.mobile || '0000000000';
        const donorAddress = memberData?.address || 'Address not provided';
        const invoiceDate = new Date().toLocaleDateString('en-IN');
        const invoiceNumber = `INV-${donation.donationId}-${Date.now().toString().slice(-6)}`;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Donation Invoice - ${donation.donationId}</title>
                <style>
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background: white;
                    }
                    
                    .invoice-container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        padding: 30px;
                    }
                    
                    .invoice-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #f97316;
                    }
                    
                    .logo-section {
                        flex: 1;
                    }
                    
                    .logo-section h1 {
                        color: #f97316;
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    
                    .logo-section p {
                        color: #666;
                        font-size: 14px;
                        margin-bottom: 3px;
                    }
                    
                    .invoice-details {
                        text-align: right;
                        flex: 1;
                    }
                    
                    .invoice-details h2 {
                        color: #333;
                        font-size: 28px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    
                    .invoice-details p {
                        color: #666;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }
                    
                    .billing-section {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;
                    }
                    
                    .billing-info {
                        flex: 1;
                        margin-right: 30px;
                    }
                    
                    .billing-info h3 {
                        color: #333;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 10px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 5px;
                    }
                    
                    .billing-info p {
                        color: #666;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }
                    
                    .donation-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    
                    .donation-table th,
                    .donation-table td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .donation-table th {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        color: #333;
                    }
                    
                    .donation-table .amount {
                        text-align: right;
                        font-weight: bold;
                        color: #f97316;
                    }
                    
                    .total-section {
                        margin-left: auto;
                        width: 300px;
                        margin-bottom: 30px;
                    }
                    
                    .total-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 0;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .total-row.final {
                        border-bottom: 2px solid #f97316;
                        font-weight: bold;
                        font-size: 18px;
                        color: #f97316;
                        padding: 12px 0;
                    }
                    
                    .payment-info {
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                    }
                    
                    .payment-info h3 {
                        color: #333;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    
                    .payment-info p {
                        color: #666;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }
                    
                    .footer-notes {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                    }
                    
                    .footer-notes h3 {
                        color: #333;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    
                    .footer-notes p {
                        color: #666;
                        font-size: 14px;
                        margin-bottom: 8px;
                    }
                    
                    .tax-info {
                        background: #e7f3ff;
                        border: 1px solid #b3d9ff;
                        padding: 15px;
                        border-radius: 8px;
                        margin-top: 20px;
                    }
                    
                    .tax-info p {
                        color: #0066cc;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }
                    
                    @media print {
                        body {
                            background: white;
                        }
                        
                        .invoice-container {
                            box-shadow: none;
                            margin: 0;
                            padding: 0;
                        }
                        
                        .no-print {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="invoice-container">
                    <!-- Header -->
                    <div class="invoice-header">
                        <div class="logo-section">
                            <h1>🕉️ Pandit Sachidanand Welfare Foundation</h1>
                            <p>सेवा परमो धर्मः</p>
                            <p>Serving Humanity with Compassion</p>
                            <p>Kushinagar, Uttar Pradesh, India</p>
                            <p>Phone: +91 9415432141</p>
                            <p>Email: sn1984.pandey@gmail.com</p>
                        </div>
                        
                        <div class="invoice-details">
                            <h2>INVOICE</h2>
                            <p><strong>Invoice #:</strong> ${invoiceNumber}</p>
                            <p><strong>Date:</strong> ${invoiceDate}</p>
                            <p><strong>Donation ID:</strong> ${donation.donationId}</p>
                        </div>
                    </div>
                    
                    <!-- Billing Information -->
                    <div class="billing-section">
                        <div class="billing-info">
                            <h3>Bill To:</h3>
                            <p><strong>${donorName}</strong></p>
                            <p>${donorAddress}</p>
                            <p>Phone: ${donorMobile}</p>
                            <p>Email: ${donorEmail}</p>
                        </div>
                        
                        <div class="billing-info">
                            <h3>Donation Details:</h3>
                            <p><strong>Date:</strong> ${new Date(donation.donationDate).toLocaleDateString('en-IN')}</p>
                            <p><strong>Purpose:</strong> ${donation.purpose}</p>
                            <p><strong>Payment Mode:</strong> ${donation.paymentMode}</p>
                            <p><strong>Transaction ID:</strong> ${donation.transactionId}</p>
                            <p><strong>Status:</strong> ${donation.status}</p>
                        </div>
                    </div>
                    
                    <!-- Donation Table -->
                    <table class="donation-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Purpose</th>
                                <th>Date</th>
                                <th class="amount">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Charitable Donation</td>
                                <td>${donation.purpose}</td>
                                <td>${new Date(donation.donationDate).toLocaleDateString('en-IN')}</td>
                                <td class="amount">₹${donation.amount.toLocaleString('en-IN')}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- Total Section -->
                    <div class="total-section">
                        <div class="total-row">
                            <span>Subtotal:</span>
                            <span>₹${donation.amount.toLocaleString('en-IN')}</span>
                        </div>
                        <div class="total-row">
                            <span>Tax (0%):</span>
                            <span>₹0</span>
                        </div>
                        <div class="total-row final">
                            <span>Total Amount:</span>
                            <span>₹${donation.amount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    
                    <!-- Payment Information -->
                    <div class="payment-info">
                        <h3>Payment Information</h3>
                        <p><strong>Payment Method:</strong> ${donation.paymentMode}</p>
                        <p><strong>Transaction ID:</strong> ${donation.transactionId}</p>
                        <p><strong>Payment Status:</strong> ${donation.status}</p>
                        <p><strong>Payment Date:</strong> ${new Date(donation.donationDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    
                    <!-- Tax Information -->
                    <div class="tax-info">
                        <p><strong>Tax Exemption Notice:</strong></p>
                        <p>This donation may be eligible for tax benefits under Section 80G of the Income Tax Act, 1961.</p>
                        <p>Please consult your tax advisor for specific deduction eligibility.</p>
                        <p>This invoice serves as a receipt for your donation records.</p>
                    </div>
                    
                    <!-- Footer Notes -->
                    <div class="footer-notes">
                        <h3>Thank You for Your Generosity!</h3>
                        <p>Your contribution makes a significant difference in the lives of those we serve.</p>
                        <p>This is a computer-generated invoice and does not require a physical signature.</p>
                        <p>For any queries regarding this donation, please contact us at sn1984.pandey@gmail.com</p>
                        
                        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                            <p>Pandit Sachidanand Welfare Foundation - Making a Difference Together</p>
                            <p>© ${new Date().getFullYear()} All Rights Reserved</p>
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
    };

    if (!donations || donations.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl">💝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Donations Yet</h3>
                <p className="text-gray-600 mb-6">You haven't made any donations yet. Start contributing to make a difference!</p>
                <button
                    onClick={() => window.location.href = '/donate'}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                    Make Your First Donation
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-2xl text-white">💰</span>
                        </div>
                        <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Total Donated</h3>
                            <p className="text-2xl font-bold text-green-600">
                                ₹{donations.reduce((sum, donation) => sum + donation.amount, 0).toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-2xl text-white">📊</span>
                        </div>
                        <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Total Donations</h3>
                            <p className="text-2xl font-bold text-blue-600">{donations.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-2xl text-white">📅</span>
                        </div>
                        <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Last Donation</h3>
                            <p className="text-lg font-bold text-purple-600">
                                {new Date(Math.max(...donations.map(d => new Date(d.date)))).toLocaleDateString('en-IN')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donations List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Donation History</h3>
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Refresh</span>
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Donation ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Purpose
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {donations.map((donation) => (
                                <tr key={donation._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {donation.donationId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {donation.purpose}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                        ₹{donation.amount.toLocaleString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(donation.donationDate).toLocaleDateString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${donation.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {donation.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setSelectedDonation(donation)}
                                                className="text-blue-600 hover:text-blue-900 font-medium"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => generateInvoice(donation)}
                                                className="text-green-600 hover:text-green-900 font-medium"
                                            >
                                                Invoice
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Donation Detail Modal */}
            {selectedDonation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Donation Details</h3>
                            <button
                                onClick={() => setSelectedDonation(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Donation ID</label>
                                    <p className="text-sm text-gray-900">{selectedDonation.donationId}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Amount</label>
                                    <p className="text-sm font-semibold text-green-600">₹{selectedDonation.amount.toLocaleString('en-IN')}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Purpose</label>
                                    <p className="text-sm text-gray-900">{selectedDonation.purpose}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Date</label>
                                    <p className="text-sm text-gray-900">{new Date(selectedDonation.donationDate).toLocaleDateString('en-IN')}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Payment Mode</label>
                                    <p className="text-sm text-gray-900">{selectedDonation.paymentMode}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Transaction ID</label>
                                    <p className="text-sm text-gray-900">{selectedDonation.transactionId}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => generateInvoice(selectedDonation)}
                                    className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    Download Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
