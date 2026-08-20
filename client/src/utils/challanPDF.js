import logo from '../assets/images/logo.jpeg';

export function formatDate(dateInput) {
  if (!dateInput) return 'N/A';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
}

export function downloadChallanPDF(data = {}) {
  const {
    challanNumber = 'N/A',
    registrationNumber = 'N/A',
    fullName = '',
    fatherName = '',
    cnicOrBform = 'N/A',
    mobileNumber = 'N/A',
    email = 'N/A',
    phase = 'N/A',
    grade = '',
    dueDate = '',
    amount = 1200,
    bank = {},
  } = data;

  const dueDateStr = formatDate(dueDate);
  const phaseLabel = `${phase}${grade ? ' - Grade ' + grade : ''}`;

  const copies = [
    { key: 'bank', label: 'BANK COPY', cls: 'label-bank' },
    { key: 'candidate', label: 'CANDIDATE COPY', cls: 'label-candidate' },
    { key: 'office', label: 'OFFICE COPY', cls: 'label-office' },
  ];

  const copyHTML = copies.map((c) => `
    <td class="copy-cell">
      <div class="logo-row">
        <img src="${logo}" class="logo-img" alt="EduTalent" />
        <div class="org-name">EDUTALENT PAKISTAN</div>
        <div class="org-tagline">Unlocking Brilliance, Rewarding Talent</div>
      </div>
      <div class="title-bar">Scholarship Application Fee Challan</div>
      <div class="accent-line"></div>
      <div class="challan-no">${challanNumber}</div>
      <div style="clear:both;">
        <div class="info-row"><div class="info-label">Reg No:</div><div class="info-value">${registrationNumber}</div></div>
        <div class="info-row"><div class="info-label">Program:</div><div class="info-value">Scholarship Testing Program 2026</div></div>
        <div class="info-row"><div class="info-label">Phase:</div><div class="info-value">${phaseLabel}</div></div>
        <div class="info-row"><div class="info-label">Due Date:</div><div class="info-value" style="color:#dc2626;">${dueDateStr}</div></div>
      </div>
      <div class="section-header"><span class="bullet">•</span> Candidate Information</div>
      <div class="info-row"><div class="info-label">Name:</div><div class="info-value">${fullName}</div></div>
      <div class="info-row"><div class="info-label">Father's Name:</div><div class="info-value">${fatherName}</div></div>
      <div class="info-row"><div class="info-label">CNIC / B-Form:</div><div class="info-value">${cnicOrBform}</div></div>
      <div class="info-row"><div class="info-label">Mobile:</div><div class="info-value">${mobileNumber}</div></div>
      <div class="info-row"><div class="info-label">Email:</div><div class="info-value">${email}</div></div>
      <div class="section-header"><span class="bullet">•</span> Fee Details</div>
      <div class="fee-table">
        <div class="fee-row"><div class="fee-label">Application Fee</div><div class="fee-value">Rs. ${amount}/-</div></div>
        <div class="fee-row"><div class="fee-label">Bank Charges</div><div class="fee-value">Rs. 0/-</div></div>
        <div class="fee-row fee-total"><div class="fee-label">Total Amount</div><div class="fee-value">Rs. ${amount}/-</div></div>
      </div>
      <div class="section-header"><span class="bullet">•</span> Bank Details</div>
      <div class="info-row"><div class="info-label">Bank:</div><div class="info-value">${bank.bankName || 'HBL (Habib Bank Limited)'}</div></div>
      <div class="info-row"><div class="info-label">Account Title:</div><div class="info-value">${bank.accountTitle || 'EduTalent Pakistan'}</div></div>
      <div class="info-row"><div class="info-label">Account No:</div><div class="info-value">${bank.accountNumber || 'N/A'}</div></div>
      <div class="info-row"><div class="info-label">Branch:</div><div class="info-value">${bank.branchCode || 'N/A'}</div></div>
      <div class="section-header"><span class="bullet">•</span> Payment Details</div>
      <div class="field-label">Deposit Date:</div>
      <div class="field-line"></div>
      <div class="field-label">Transaction ID / Slip No:</div>
      <div class="field-line"></div>
      <div class="field-label">Bank Stamp &amp; Signature:</div>
      <div class="field-line"></div>
      <div class="section-header"><span class="bullet">•</span> Instructions</div>
      <ol class="instruction-list">
        <li>Bring original receipt at test center.</li>
        <li>Incomplete applications will not be accepted.</li>
        <li>After fee submission, upload paid challan online.</li>
        <li>Fee is non-refundable.</li>
      </ol>
      <div class="section-header"><span class="bullet">•</span> Terms &amp; Conditions</div>
      <ol class="instruction-list">
        <li>This challan is valid for 15 days from the date of issue.</li>
        <li>Challan is non-transferable and non-refundable.</li>
        <li>Candidates must bring original challan receipt on test day.</li>
        <li>Duplicate challans are not issued.</li>
      </ol>
      <div class="copy-label ${c.cls}">${c.label}</div>
    </td>
  `).join('');

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`
    <html><head><title>Fee Challan - ${challanNumber}</title>
    <style>
      @page { size: A4 landscape; margin: 6mm; }
      * { margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; font-size: 7.5pt; background: #fff; }
      .main-table { width: 100%; border-collapse: collapse; }
      .copy-cell { width: 33.33%; vertical-align: top; border: 1.5pt solid #1a2d4a; padding: 5pt; }
      .copy-cell + .copy-cell { border-left: 1pt dashed #94a3b8; }
      .logo-row { text-align: center; border-bottom: 2pt solid #1a2d4a; padding-bottom: 5pt; margin-bottom: 5pt; }
      .logo-img { height: 22pt; margin-bottom: 3pt; background: #fff; border-radius: 50%; }
      .org-name { font-size: 10pt; font-weight: bold; color: #1a2d4a; letter-spacing: .3pt; }
      .org-tagline { font-size: 6.5pt; color: #64748b; letter-spacing: .5pt; margin-top: 1pt; }
      .title-bar { background-color: #1a2d4a; color: #fff; text-align: center; font-weight: bold; font-size: 8pt; padding: 3.5pt; margin-bottom: 5pt; letter-spacing: .3pt; }
      .accent-line { height: 1.5pt; background-color: #f6b13a; margin: 0 35% 4pt; }
      .challan-no { text-align: right; font-size: 7pt; font-weight: bold; margin-bottom: 4pt; color: #1a2d4a; }
      .info-row { display: table; width: 100%; border-bottom: .5pt solid #e2e8f0; margin-bottom: 1pt; }
      .info-label { display: table-cell; width: 38%; font-size: 7pt; color: #64748b; padding: 2pt 0; font-weight: 500; }
      .info-value { display: table-cell; font-size: 7pt; font-weight: bold; padding: 2pt 0; color: #1e293b; }
      .section-header { background-color: #1a2d4a; color: #fff; font-weight: bold; font-size: 7pt; padding: 2.5pt 5pt; margin: 5pt 0 3pt; letter-spacing: .3pt; }
      .bullet { color: #f6b13a; font-size: 7pt; margin-right: 3pt; }
      .fee-table { width: 100%; }
      .fee-row { display: table; width: 100%; border-bottom: .5pt solid #e2e8f0; padding: 2pt 0; }
      .fee-label { display: table-cell; font-size: 7pt; color: #475569; }
      .fee-value { display: table-cell; font-size: 7pt; font-weight: bold; text-align: right; color: #1e293b; }
      .fee-total { background-color: rgba(26,45,74,.06); }
      .fee-total .fee-label,
      .fee-total .fee-value { font-size: 8pt; font-weight: bold; color: #1a2d4a; }
      .field-line { border-bottom: .5pt solid #94a3b8; height: 11pt; margin-bottom: 2pt; }
      .field-label { font-size: 6.5pt; color: #64748b; }
      .instruction-list { padding-left: 10pt; margin-top: 1pt; }
      .instruction-list li { font-size: 6.5pt; color: #475569; margin-bottom: 1.2pt; }
      .copy-label { text-align: center; font-size: 7pt; font-weight: bold; letter-spacing: 1pt; padding: 2.5pt; margin-top: 4pt; }
      .label-bank { background-color: #1a2d4a; color: #fff; }
      .label-candidate { background-color: #16a34a; color: #fff; }
      .label-office { background-color: #f59e0b; color: #1a2d4a; }
    </style></head><body>
    <table class="main-table"><tr>
    ${copyHTML}
    </tr></table>
    </body></html>
  `);
  win.document.close();
  win.focus();
  win.print();
}
