"use client";
import React from 'react';

export default function MemberIdCard({ member }) {
    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        // Show loading indicator on button
        const downloadButton = document.querySelector("[data-idcard-download]");
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
        if (member?.photoUrl) {
            photoUrl = member.photoUrl;
        }

        // Prepare member data with fallbacks
        const memberName = member?.memberName || 'Member Name';
        const memberId = member?.membershipId || 'PSWF-XXX-XXXXX';
        const email = member?.email || 'email@example.com';
        const mobile = member?.mobile || '0000000000';
        const issuedDate = new Date().toLocaleDateString('en-IN');

        // ID Card HTML - Standard ID card dimensions (85.6mm x 53.98mm)
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Member ID Card - ${memberName}</title>
                <style>
                    @page {
                        size: 85.6mm 53.98mm;
                        margin: 0;
                    }
                    
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                    
                    body {
                        font-family: 'Arial', sans-serif;
                        width: 85.6mm;
                        height: 53.98mm;
                        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .id-card {
                        width: 100%;
                        height: 100%;
                        background: white;
                        border-radius: 8px;
                        padding: 8px;
                        position: relative;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }
                    
                    .card-header {
                        background: linear-gradient(135deg, #f97316, #ea580c);
                        color: white;
                        padding: 4px 6px;
                        border-radius: 4px;
                        text-align: center;
                        margin-bottom: 6px;
                    }
                    
                    .org-name {
                        font-size: 9px;
                        font-weight: bold;
                        line-height: 1.1;
                        margin-bottom: 1px;
                    }
                    
                    .org-tagline {
                        font-size: 6px;
                        opacity: 0.9;
                    }
                    
                    .card-body {
                        display: flex;
                        gap: 6px;
                        height: calc(100% - 28px);
                    }
                    
                    .photo-section {
                        width: 22mm;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .member-photo {
                        width: 20mm;
                        height: 24mm;
                        border-radius: 4px;
                        object-fit: cover;
                        border: 1px solid #e5e7eb;
                        background: #f3f4f6;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        color: #6b7280;
                    }
                    
                    .member-photo img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 3px;
                    }
                    
                    .info-section {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: 2px 0;
                    }
                    
                    .member-details {
                        flex: 1;
                    }
                    
                    .member-name {
                        font-size: 10px;
                        font-weight: bold;
                        color: #1f2937;
                        margin-bottom: 3px;
                        line-height: 1.1;
                        text-transform: uppercase;
                    }
                    
                    .member-id {
                        font-size: 8px;
                        color: #f97316;
                        font-weight: bold;
                        margin-bottom: 4px;
                        font-family: 'Courier New', monospace;
                    }
                    
                    .contact-info {
                        font-size: 7px;
                        color: #4b5563;
                        line-height: 1.2;
                        margin-bottom: 3px;
                    }
                    
                    .card-footer {
                        border-top: 1px solid #e5e7eb;
                        padding-top: 2px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .issue-date {
                        font-size: 6px;
                        color: #6b7280;
                    }
                    
                    .validity {
                        font-size: 6px;
                        color: #059669;
                        font-weight: bold;
                    }
                    
                    .decorative-corner {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: linear-gradient(45deg, #f97316, #ea580c);
                        border-radius: 50%;
                    }
                    
                    .corner-top-left { top: 2px; left: 2px; }
                    .corner-top-right { top: 2px; right: 2px; }
                    .corner-bottom-left { bottom: 2px; left: 2px; }
                    .corner-bottom-right { bottom: 2px; right: 2px; }
                    
                    .watermark {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 24px;
                        color: #f97316;
                        opacity: 0.05;
                        z-index: 0;
                    }
                    
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none !important; }
                    }
                </style>
            </head>
            <body>
                <div class="id-card">
                    <!-- Decorative corners -->
                    <div class="decorative-corner corner-top-left"></div>
                    <div class="decorative-corner corner-top-right"></div>
                    <div class="decorative-corner corner-bottom-left"></div>
                    <div class="decorative-corner corner-bottom-right"></div>
                    
                    <!-- Watermark -->
                    <div class="watermark">🕉️</div>
                    
                    <!-- Header -->
                    <div class="card-header">
                        <div class="org-name">PANDIT SACHIDANAND WELFARE FOUNDATION</div>
                        <div class="org-tagline">सेवा परमो धर्मः</div>
                    </div>
                    
                    <!-- Body -->
                    <div class="card-body">
                        <!-- Photo Section -->
                        <div class="photo-section">
                            <div class="member-photo">
                                ${photoUrl ? `<img src="${photoUrl}" alt="${memberName}" />` : '👤'}
                            </div>
                        </div>
                        
                        <!-- Info Section -->
                        <div class="info-section">
                            <div class="member-details">
                                <div class="member-name">${memberName}</div>
                                <div class="member-id">ID: ${memberId}</div>
                                <div class="contact-info">📧 ${email}</div>
                                <div class="contact-info">📱 +91 ${mobile}</div>
                            </div>
                            
                            <div class="card-footer">
                                <div class="issue-date">Issued: ${issuedDate}</div>
                                <div class="validity">VALID</div>
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

    const memberId = member?.membershipId || 'PSWF-XXX-XXXXX';

    return (
        <div className="space-y-6">
            {/* ID Card Preview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">ID Card Preview</h4>

                {/* Preview of ID Card */}
                <div className="mx-auto" style={{ width: '340px', height: '214px' }}>
                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-2 shadow-lg">
                        <div className="w-full h-full bg-white rounded-md p-3 relative">
                            {/* Decorative corners */}
                            <div className="absolute top-1 left-1 w-2 h-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full"></div>
                            <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full"></div>
                            <div className="absolute bottom-1 left-1 w-2 h-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full"></div>
                            <div className="absolute bottom-1 right-1 w-2 h-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full"></div>

                            {/* Watermark */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-orange-200 opacity-20">
                                🕉️
                            </div>

                            {/* Header */}
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded text-center mb-2">
                                <div className="text-xs font-bold leading-tight">PANDIT SACHIDANAND WELFARE FOUNDATION</div>
                                <div className="text-xs opacity-90">सेवा परमो धर्मः</div>
                            </div>

                            {/* Body */}
                            <div className="flex gap-2 h-32">
                                {/* Photo */}
                                <div className="w-20 flex-shrink-0">
                                    <div className="w-full h-24 bg-gray-100 rounded border overflow-hidden flex items-center justify-center">
                                        {member?.photoUrl ? (
                                            <img src={member.photoUrl} alt={member.memberName} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl text-gray-400">👤</span>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="text-sm font-bold text-gray-800 uppercase leading-tight mb-1">
                                            {member?.memberName || 'Member Name'}
                                        </div>
                                        <div className="text-xs text-orange-600 font-bold font-mono mb-2">
                                            ID: {memberId}
                                        </div>
                                        <div className="text-xs text-gray-600 space-y-1">
                                            <div>📧 {member?.email || 'email@example.com'}</div>
                                            <div>📱 +91 {member?.mobile || '0000000000'}</div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-1 flex justify-between items-center">
                                        <div className="text-xs text-gray-500">
                                            Issued: {new Date().toLocaleDateString('en-IN')}
                                        </div>
                                        <div className="text-xs text-green-600 font-bold">VALID</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Section */}
            <div className="text-center">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-orange-700">
                        📏 <strong>Standard ID Card Size:</strong> 85.6mm × 53.98mm (Credit card size)<br />
                        💡 <strong>Tip:</strong> Print on cardstock paper for best results
                    </p>
                </div>

                <button
                    onClick={handlePrint}
                    data-idcard-download
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors mx-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Download ID Card
                </button>

                <p className="text-sm text-gray-500 mt-2">
                    Your ID card will be downloaded in print-ready format
                </p>
            </div>
        </div>
    );
}
