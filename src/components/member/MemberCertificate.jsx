"use client";
import React, { useRef } from 'react';
import { LotusIcon, OmIcon } from '../icons';

export default function MemberCertificate({ member }) {
    const certificateRef = useRef(null);

    const handlePrint = () => {
        // Create a new window specifically for printing
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        // Show loading indicator on button
        const downloadButton = document.querySelector("[data-certificate-download]");
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

        // Get the photo URL if available
        let photoUrl = '';
        if (member?.photo) {
            if (typeof member.photo === 'string') {
                photoUrl = member.photo;
            } else {
                try {
                    photoUrl = URL.createObjectURL(member.photo);
                } catch (e) {
                    console.error("Could not create object URL for photo", e);
                }
            }
        }

        // Prepare member data with fallbacks
        const memberName = member?.memberName || 'Member Name';
        const memberId = generateMemberId();
        const issuedDate = formatDate();

        // Print content with embedded SVG
        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Membership Certificate</title>
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
              border: 25px solid #f97316;
              height: 100%;
              position: relative;
              padding: 40px;
              box-sizing: border-box;
            }
            
            .border-pattern {
              position: absolute;
              top: 10px;
              left: 10px;
              right: 10px;
              bottom: 10px;
              border: 2px solid #fcd34d;
              pointer-events: none;
            }
            
            .certificate-header {
              text-align: center;
              margin-bottom: 30px;
            }
            
            .certificate-title {
              font-size: 36px;
              font-weight: bold;
              color: #f97316;
              margin: 10px 0;
            }
            
            .certificate-subtitle {
              font-size: 18px;
              color: #7c2d12;
            }
            
            .certificate-body {
              margin: 20px 40px;
              text-align: center;
            }
            
            .member-name {
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
              border: 2px dashed #f97316;
            }
            
            .seal-inner {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              border: 1px solid #f97316;
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: 0.7;
            }
            
            .member-photo {
              width: 100px;
              height: 100px;
              object-fit: cover;
              border-radius: 50%;
              border: 3px solid #f97316;
            }
            
            .registration-id {
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
              opacity: 0.05;
              z-index: -1;
            }
            
            .lotus-icon {
              width: 300px;
              height: 300px;
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
                <!-- Border Pattern -->
                <div class="border-pattern"></div>
                
                <!-- Watermark -->
                <div class="watermark">
                  <svg class="lotus-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2c3 3 3 7.5 0 10.5 3-3 3-7.5 0-10.5Z"></path>
                    <path d="M12 2c-3 3-3 7.5 0 10.5 -3-3-3-7.5 0-10.5Z"></path>
                    <path d="M12 2c0 5 4 10 8 12-4-2-8-7-8-12Z"></path>
                    <path d="M12 2c0 5-4 10-8 12 4-2 8-7 8-12Z"></path>
                    <path d="M12 22c3-3 6-3 9-6-3 3-6 3-9 6Z"></path>
                    <path d="M12 22c-3-3-6-3-9-6 3 3 6 3 9 6Z"></path>
                    <path d="M19 11.5c-2 3-5 4.5-7 4.5 2-1 5-3 7-4.5Z"></path>
                    <path d="M5 11.5c2 3 5 4.5 7 4.5-2-1-5-3-7-4.5Z"></path>
                    <circle cx="12" cy="12.5" r="1"></circle>
                  </svg>
                </div>
                
                <!-- Certificate Header -->
                <div class="certificate-header">
                  <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2c3 3 3 7.5 0 10.5 3-3 3-7.5 0-10.5Z"></path>
                      <path d="M12 2c-3 3-3 7.5 0 10.5 -3-3-3-7.5 0-10.5Z"></path>
                      <path d="M12 2c0 5 4 10 8 12-4-2-8-7-8-12Z"></path>
                      <path d="M12 2c0 5-4 10-8 12 4-2 8-7 8-12Z"></path>
                      <path d="M12 22c3-3 6-3 9-6-3 3-6 3-9 6Z"></path>
                      <path d="M12 22c-3-3-6-3-9-6 3 3 6 3 9 6Z"></path>
                      <path d="M19 11.5c-2 3-5 4.5-7 4.5 2-1 5-3 7-4.5Z"></path>
                      <path d="M5 11.5c2 3 5 4.5 7 4.5-2-1-5-3-7-4.5Z"></path>
                      <circle cx="12" cy="12.5" r="1"></circle>
                    </svg>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-8 0 4 4 0 1 0 8 0"></path>
                    </svg>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2c3 3 3 7.5 0 10.5 3-3 3-7.5 0-10.5Z"></path>
                      <path d="M12 2c-3 3-3 7.5 0 10.5 -3-3-3-7.5 0-10.5Z"></path>
                      <path d="M12 2c0 5 4 10 8 12-4-2-8-7-8-12Z"></path>
                      <path d="M12 2c0 5-4 10-8 12 4-2 8-7 8-12Z"></path>
                      <path d="M12 22c3-3 6-3 9-6-3 3-6 3-9 6Z"></path>
                      <path d="M12 22c-3-3-6-3-9-6 3 3 6 3 9 6Z"></path>
                      <path d="M19 11.5c-2 3-5 4.5-7 4.5 2-1 5-3 7-4.5Z"></path>
                      <path d="M5 11.5c2 3 5 4.5 7 4.5-2-1-5-3-7-4.5Z"></path>
                      <circle cx="12" cy="12.5" r="1"></circle>
                    </svg>
                  </div>
                  <h1 class="certificate-title">Certificate of Membership</h1>
                  <h2 class="certificate-subtitle">Pandit Sachidanand Welfare Foundation</h2>
                </div>
                
                <!-- Certificate Body -->
                <div class="certificate-body">
                  <p class="certificate-text">
                    This is to certify that
                  </p>
                  <h2 class="member-name">${memberName}</h2>
                  
                  <div style="margin: 20px 0; display: flex; justify-content: center;">
                    ${photoUrl ? `<img src="${photoUrl}" alt="${memberName}" class="member-photo" />` : ''}
                  </div>
                  
                  <p class="certificate-text">
                    has been accepted as a Member of the<br/>
                    <span style="font-weight: 600;">Pandit Sachidanand Welfare Foundation</span><br/>
                    and is entitled to all rights and privileges of this membership.
                  </p>
                  
                  <div class="registration-id">
                    Registration ID: ${memberId}
                  </div>
                </div>
                
                <!-- Certificate Footer -->
                <div class="certificate-footer">
                  <div class="signature-box">
                    <div class="signature-line"></div>
                    <p style="font-size: 14px; color: #64748b;">Member's Signature</p>
                  </div>
                  
                  <div class="signature-box">
                    <div class="signature-line"></div>
                    <p style="font-size: 14px; color: #64748b;">President's Signature</p>
                  </div>
                </div>
                
                <div class="date-issued">
                  Issued on: ${issuedDate}
                </div>
                
                <!-- Certificate Seal -->
                <div class="certificate-seal">
                  <div class="seal-inner">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2c3 3 3 7.5 0 10.5 3-3 3-7.5 0-10.5Z"></path>
                      <path d="M12 2c-3 3-3 7.5 0 10.5 -3-3-3-7.5 0-10.5Z"></path>
                      <path d="M12 2c0 5 4 10 8 12-4-2-8-7-8-12Z"></path>
                      <path d="M12 2c0 5-4 10-8 12 4-2 8-7 8-12Z"></path>
                      <path d="M12 22c3-3 6-3 9-6-3 3-6 3-9 6Z"></path>
                      <path d="M12 22c-3-3-6-3-9-6 3 3 6 3 9 6Z"></path>
                      <path d="M19 11.5c-2 3-5 4.5-7 4.5 2-1 5-3 7-4.5Z"></path>
                      <path d="M5 11.5c2 3 5 4.5 7 4.5-2-1-5-3-7-4.5Z"></path>
                      <circle cx="12" cy="12.5" r="1"></circle>
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

    const generateMemberId = () => {
        const timestamp = Date.now().toString().slice(-6);
        const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `PSWF-${randomChars}-${timestamp}`;
    };

    const formatDate = () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-IN', options);
    };

    const memberId = generateMemberId();

    // Certificate ID is generated in the component

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

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Registration Complete!</h2>
                <p className="text-gray-600 mb-6">
                    Your membership has been successfully registered with ID: <span className="font-semibold">{memberId}</span>. You can now download your official membership certificate.
                </p>

                {/* Certificate Download Button */}
                <button
                    onClick={handlePrint}
                    data-certificate-download
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors mx-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Certificate
                </button>
            </div>
        </div>
    );
}
