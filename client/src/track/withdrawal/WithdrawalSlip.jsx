import React from 'react';
import './WithdrawalSlip.css';

const WithdrawalSlip = ({
  branch = '',
  date = '',         // Expected format 'DDMMYYYY' (e.g. '19032026')
  amountInMarathiWords = '',
  amountInHindiWords = '',
  amountInWords = '',
  accountNumber = '', // Expected string up to 13 digits
  accountHolderName = '',
  amount = ''
}) => {
  // Parse date into exactly 8 boxes or empty strings
  const dateChars = (date || '').padEnd(8, ' ').split('').slice(0, 8);
  
  // Parse account number into exactly 13 boxes
  const accChars = (accountNumber || '').padEnd(13, ' ').split('').slice(0, 13);

  return (
    <div className="slip-container">
      <div className="slip">
        {/* TITLE */}
        <div className="title">
          CASH WITHDRAWAL SLIP / पैसे काढावयाचे चलन /&nbsp; नकद आहर्ता पर्ची
        </div>

        {/* HEADER */}
        <div className="header-row">
          <div className="logo-box">
            <div className="logo-circle">🏛</div>
            <div className="bank-name-block">
              <div className="bm">बँक ऑफ महाराष्ट्र</div>
              <div className="be">Bank of Maharashtra</div>
              {/* <div className="bt">एक परिवार एक बँक</div> */}
            </div>
            {/* <div className="logo-sub">एक परिवार एक बँक</div> */}
          </div>
          <div className="instructions">
            <p>बँकेतून पैसे काढावयाच्या चलनाबरोबर खाते पुस्तिका आवश्यक आहे. कृपया मागे सही करावी. हे चलन म्हणजे चेक नव्हे. केवळ मूळ शाखेत वापरण्यासाठी</p>
            <p>इस निकासी पर्ची के साथ पासबुक होना जरुरी हैं । कृपया पिछली और हस्ताक्षर करें । यह आहरण पर्ची चेक नहीं हैं । केवल मूल शाखा में प्रचुक्त हेतु ।</p>
            <p><strong>Pass Book must accompany with this withdrawal. Please sign overleaf. This withdrawal slip is not cheque. Use at home branch only.</strong></p>
          </div>
        </div>

        {/* BRANCH / DATE */}
        <div className="branch-date-row">
          <div className="branch-sec">
            <label>शाखा/ Branch</label>
            <div className="val-line"><span className="val-text">{branch}</span></div>
          </div>
          <div className="date-sec">
            <label>दिनांक / Date :</label>
            <div className="date-boxes">
              {dateChars.map((char, index) => (
                <input
                  key={`date-${index}`}
                  className="dbox"
                  type="text"
                  maxLength="1"
                  value={char.trim()}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>

        {/* PAY LINES */}
        <div className="pay-section">
          <div className="pay-line">
            <label>कृपया, मला वा धारकाला ₹ .</label>
            <div className="val-line"><span className="val-text">{amountInMarathiWords || amountInWords}</span></div>
          </div>
          <div className="pay-line">
            <label>Pay Bearer/Self the sum of ₹ .</label>
            <div className="val-line"><span className="val-text">{amountInWords}</span></div>
            <span className="sfx">debiting</span>
          </div>
        </div>

        {/* ACCOUNT NO */}
        <div className="ac-row">
          <div className="ac-left">
            <div className="ac-label">
              बचत खाते क्र.<br />बचत खाता क्र.<br />Saving A/c No.
            </div>
            <div className="ac-digits">
              {accChars.map((char, index) => (
                <input
                  key={`acc-${index}`}
                  className="abox"
                  type="text"
                  maxLength="1"
                  value={char.trim()}
                  readOnly
                />
              ))}
            </div>
          </div>
          <div className="ac-right">
            ला नावे टाकून रोख द्यावेत.<br />
            में नामे डालकर नकद अदा करें।
          </div>
        </div>

        {/* NAME + AMOUNT */}
        <div className="name-amount-row">
          <div className="name-sec">
            <div className="name-line">
              <label>खातेदाराचे नांव</label>
              <div className="val-line"><span className="val-text">{accountHolderName}</span></div>
            </div>
            <div className="name-line">
              <label>खाताधारक का नाम</label>
              <div className="val-line"><span className="val-text">{accountHolderName}</span></div>
            </div>
            <div className="name-line">
              <label>in Name of A/c.</label>
              <div className="val-line"><span className="val-text">{accountHolderName}</span></div>
            </div>
          </div>
          <div className="amount-col">
            <div className="amount-inner">
              <div className="rupee-cell">₹</div>
              <div className="amount-val-line">
                <span className="amount-val-text">{amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNATURES */}
        <div className="sig-row">
          <div className="sig-left">
            <div>खातेदाराची स्वाक्षरी</div>
            <div>खाताधारक के हस्ताक्षर</div>
            <div className="sig-line">
              A/c. Holder's Signature <span className="uline"></span>
            </div>
          </div>
          <div className="sig-right">
            <div>पासकर्ता अधिकारी/निरीक्षक/कर्मचान्याची स्वाक्षरी</div>
            <div>पासकर्ता अधिकारी/निरीक्षक/कर्मचारी के हस्ताक्षर</div>
            <div className="sig-line">
              <strong>Signature of Passing Officer/Supervisor/Employee</strong>&nbsp;
              <span className="uline"></span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">◄ &nbsp; F-24C/PAD/SBF/2019</div>
      </div>
    </div>
  );
};

export default WithdrawalSlip;