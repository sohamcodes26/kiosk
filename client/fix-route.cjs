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

  if (content.includes("navigate('/service-selection')")) {
    content = content.replace(/navigate\('\/service-selection'\)/g, "navigate('/services')");
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed route in: ' + file);
  }
}