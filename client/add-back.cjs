const fs = require('fs');

const files = [
  'src/track/withdrawal/WithdrawalCash.jsx',
  'src/track/deposit_cash/DepositCash.jsx',
  'src/track/deposit_cheque/DepositCheque.jsx',
  'src/track/deposit_DD/DepositDD.jsx',
  'src/track/banking_services/BalanceInquiry.jsx',
  'src/track/banking_services/MiniStatement.jsx',
  'src/track/banking_services/FullStatement.jsx',
  'src/track/banking_services/FixedDeposit.jsx',
  'src/track/customer_request/request_atm/RequestATM.jsx',
  'src/track/customer_request/request_chequebook/RequestChequebook.jsx',
  'src/track/customer_request/update_mobile/UpdateMobileNumber.jsx',
  'src/track/customer_request/pin_change/PinChange.jsx',
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log('File not found: ' + file);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');

  // Inject 'ArrowLeft' import
  if (!content.includes('lucide-react')) {
    content = content.replace(/(import.*from 'react';?)/, "$1\nimport { ArrowLeft } from 'lucide-react';");
  } else if (!content.includes('ArrowLeft')) {
    content = content.replace(/(import\s+{)([^}]+)(}\s+from\s+['"]lucide-react['"];?)/, "$1$2, ArrowLeft $3");
  }

  // Inject 'useNavigate' import
  if (!content.includes('useNavigate')) {
    content = content.replace(/(import.*from 'react';?)/, "$1\nimport { useNavigate } from 'react-router-dom';");
  }
  
  // Define navigate
  if (!content.includes('const navigate = useNavigate(')) {
    const rx = /(const [A-Za-z0-9_]+\s*=\s*\([^)]*\)\s*=>\s*\{)([^]*?)return/;
    content = content.replace(rx, (m, p1, body) => `${p1}\n    const navigate = useNavigate();\n${body}return`);
  }

  // Add the button right before the first text-3xl or equivalent h2 title
  if (!content.includes("/service-selection'")) {
    const rxTitle = /(<h2[^>]*>)/i;
    const buttonHtml = `
                        <button 
                            onClick={() => navigate('/service-selection')} 
                            className="absolute left-[-2rem] md:left-0 lg:left-[2rem] xl:left-[3rem] p-2 hover:bg-blue-100 rounded-full transition-colors z-10"
                        >
                            <ArrowLeft size={36} className="text-gray-700" />
                        </button>
                        $1`;
    content = content.replace(rxTitle, buttonHtml);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
}