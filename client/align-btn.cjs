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

  // Fix button classes so it represents fixed relative placement at left-[3rem]
  const btnPattern = /className="absolute left-\[-2rem\] md:left-0 lg:left-\[2rem\] xl:left-\[3rem\] p-2 hover:bg-blue-100 rounded-full transition-colors z-10"/g;
  content = content.replace(btnPattern, `className="absolute left-[3rem] p-2 hover:bg-blue-100 rounded-full transition-colors z-10"`);

  // Fix the parent title div so it has the same max width (w-full max-w-[90rem]) as the preview
  // Pattern to match the title div, for example: `<div className="w-full max-w-5xl flex items-center justify-center relative mb-... mt-...">`
  // We can look for `<div className="w-full max-w-.*? flex items-center`
  const divPattern = /<div className="(w-full max-w-[^ ]+ flex items-center justify-center relative[^"]*)"/g;
  content = content.replace(divPattern, `<div className="w-full max-w-[90rem] flex items-center justify-center relative mb-8 mt-4 px-12"`);

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated formatting for: ' + file);
}