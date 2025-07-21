"use client";
import React, { useRef } from 'react';
import { LotusIcon, OmIcon, IndianRupeeIcon } from '../icons';

export default function DonationCertificate({ donation }) {
  const certificateRef = useRef(null);

  const handlePrint = () => {
    // Create a new window specifically for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    // Show loading indicator on button
    const downloadButton = document.querySelector("[data-donation-certificate-download]");
    if (downloadButton) {
      const originalText = downloadButton.innerHTML;
      downloadButton.disabled = true;
      downloadButton.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> Preparing...`;

      // Reset button after a timeout
      setTimeout(() => {
        downloadButton.disabled = false;
        downloadButton.innerHTML = originalText;
      }, 3000);
    }

    // Prepare donation data with fallbacks
    const donorName = donation?.donorName || 'Donor Name';
    const donationAmount = donation?.amount ? `₹${donation.amount}` : '₹0';
    const paymentMode = donation?.paymentMode || 'Online';
    const donationId = generateDonationId();
    const issuedDate = formatDate();
    const formattedAmount = formatAmountInWords(donation?.amount || 0);

    // Print content with embedded SVG
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Donation Certificate</title>
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
              overflow: hidden;
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
            
            .amount-words {
              font-style: italic;
              color: #4b5563;
              margin-bottom: 20px;
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
            
            .rupee-icon {
              width: 300px;
              height: 300px;
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
              
              .no-print {
                display: none !important;
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
                  
                  <p class="amount-words">
                    (${formattedAmount})
                  </p>
                  
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
  };

  const generateDonationId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `PSWF-DON-${randomChars}${timestamp}`;
  };

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-IN', options);
  };

  const formatAmountInWords = (amount) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    });

    // Convert to Indian number words (simplified version)
    const amountInINR = formatter.format(amount);

    // This is a simplified example, in a real app you'd use a proper library 
    // for converting numbers to words in Indian format
    return amountInINR + " Only";
  };

  const donationId = generateDonationId();

  return (
    <div className="p-8 flex flex-col items-center">
      {/* Hidden reference div for certificate content - not visible to user */}
      <div
        ref={certificateRef}
        className="hidden"
      >
        {/* Certificate content still exists but is hidden */}
      </div>

      {/* Success message and download button */}
      <div className="text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You for Your Donation!</h2>
        <p className="text-gray-600 mb-6">
          Your generous contribution of <span className="font-semibold text-green-600">₹{donation?.amount || 0}</span> has been received. Donation ID: <span className="font-semibold">{donationId}</span>
        </p>

        {/* Certificate Download Button */}
        <button
          onClick={handlePrint}
          data-donation-certificate-download
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Certificate & Receipt
        </button>
      </div>
    </div>
  );
}
