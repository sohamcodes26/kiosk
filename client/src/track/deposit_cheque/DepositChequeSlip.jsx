import React from 'react';
import './DepositChequeSlip.css';

const DepositChequeSlip = ({
  branch = '',
  date = '',
  accountNumber = '',
  accountHolderName = '',
  amount = '',
  amountInWords = '',
  panNumber = '',
  mobileNumber = '',
  email = '',
  chequeNumber = '',
  chequeBank = '',
}) => {
  const dateChars = (date || '').padEnd(8, ' ').split('').slice(0, 8);
  // Using 13 grids as per deposit slip
  const accChars = (accountNumber || '').padEnd(14, ' ').split('').slice(0, 14); 
  const panChars = (panNumber || '').padEnd(10, ' ').split('').slice(0, 10);

  return (
    <div className="deposit-slip-container">
      <div className="deposit-slip">

        {/* ══════════════════════════════════
             PANEL 1
        ══════════════════════════════════ */}
        <div className="panel p1">
          <div className="p1-header">
            <div className="p1-logo-wrap"><div className="logo-circle">🏛</div></div>
            <div className="p1-bank-block">
              <div className="bm">बँक ऑफ</div>
              <div className="bm">महाराष्ट्र</div>
              <div className="be">Bank of</div>
              <div className="be">Maharashtra</div>
              <div className="bs">एक परिवार एक बँक</div>
            </div>
            <div className="p1-title">
              <div className="en">DEPOSIT / PAY IN<br/>SLIP</div>
              <div className="mr">पैसे भरणा स्लीप</div>
            </div>
          </div>

          <div className="p1-body">
            <div className="field-row">
              <label>शाखा/ Branch :</label>
              <div className="val-line"><span className="val-text">{branch}</span></div>
            </div>

            <div className="date-row">
              <label>दिनांक /Date</label>
              <div className="dboxes">
                {dateChars.map((char, index) => (
                  <div key={`d1-${index}`} className="dbox">{char.trim()}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="ac-label-text">
                बचत/चालू/ओडी/केश क्रेडिट/आवर्ती जमा खाते/टीएल/डीएल खाते/ क्रेडिट कार्ड नं.<br/>
                <strong>SB/CA/OD/CC/RD/TL/DL/A/c No./Credit Card No.</strong>
              </div>
              <div className="acboxes">
                {accChars.slice(0,13).map((char, index) => (
                  <div key={`a1-${index}`} className="dbox">{char.trim()}</div>
                ))}
              </div>
            </div>

            <div className="field-row">
              <label>नाव /Name :</label>
              <div className="val-line"><span className="val-text">{accountHolderName}</span></div>
            </div>

            <div className="field-row">
              <label>टेलिफोन नं. /Tel. No.:</label>
              <div className="val-line"><span className="val-text">{mobileNumber}</span></div>
            </div>

            <div className="amount-row">
              <label>रक्कम/Amount :</label>
              <div className="amount-box">
                <div className="rupee-cell">₹</div>
                <div className="val-line val-line-amount"><span className="val-text amount-val">{amount}</span></div>
              </div>
            </div>

            <div className="field-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <label>अक्षरी रक्कम रु. /Rupees in Words :</label>
              <div className="val-line w-full"><span className="val-text">{amountInWords}</span></div>
            </div>

            <table className="chtable">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', width: '55%' }}>Cash/Cheque Date &amp;<br/>Name of Bank &amp; Branch</th>
                  <th>₹</th>
                  <th>Ps.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fill-blue font-bold px-1" style={{fontSize: '11px'}}>{chequeNumber} - {chequeBank}</td>
                  <td className="fill-blue text-center font-bold">{amount}</td>
                  <td className="fill-blue text-center font-bold">00</td>
                </tr>
                <tr><td style={{ height: '28px' }}></td><td></td><td></td></tr>
                <tr><td style={{ height: '28px' }}></td><td></td><td></td></tr>
                <tr className="trow">
                  <td colSpan="1" style={{ textAlign: 'right' }}>एकुण/ Total</td>
                  <td className="fill-blue text-center font-bold">{amount}</td>
                  <td className="fill-blue text-center font-bold">00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cashier-row">
            <span>रोखपाल/ Cashier</span>
            <div className="cashier-box"></div>
          </div>
        </div>

        {/* ══════════════════════════════════
             PANEL 2
        ══════════════════════════════════ */}
        <div className="panel p2">
          <div className="p2-title">
            <span className="sm">पैसे भरणा स्लीप /</span> DEPOSIT / PAY IN SLIP
          </div>

          <div className="p2-pan">
            <div className="p2-pan-row">
              <label>PAN NO</label>
              <div className="panboxes">
                {panChars.map((char, index) => (
                  <div key={`p-${index}`} className="dbox">{char.trim()}</div>
                ))}
              </div>
            </div>
            <div className="form60-row">
              <label>or Form 60</label>
              <div className="form60-box"></div>
            </div>
            <div className="cash-note">For Cash Deposit of 50,000/- &amp; Above</div>
          </div>

          <table className="ntable">
            <thead>
              <tr className="dark">
                <th colSpan="4" style={{ textAlign: 'center' }}>रोख जमा विवरण / CASH DEPOSIT</th>
              </tr>
              <tr className="subhd">
                <th style={{ textAlign: 'left' }}>नोट/Notes</th>
                <th>सं./No.</th>
                <th>₹</th>
                <th>Ps.</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>2000 x</td><td></td><td></td><td></td></tr>
              <tr><td>500 x</td><td></td><td></td><td></td></tr>
              <tr><td>200 x</td><td></td><td></td><td></td></tr>
              <tr><td>100 x</td><td></td><td></td><td></td></tr>
              <tr><td>50 x</td><td></td><td></td><td></td></tr>
              <tr><td>20 x</td><td></td><td></td><td></td></tr>
              <tr><td>10 x</td><td></td><td></td><td></td></tr>
              <tr><td>5 x</td><td></td><td></td><td></td></tr>
              <tr><td>नाणी/Coins</td><td></td><td></td><td></td></tr>
              <tr className="trow">
                <td colSpan="2" style={{ textAlign: 'right' }}>एकुण/Total</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="p2-footer">SERVICE TAX REG NO.: AACCB 0774 BST 679</div>
        </div>

        {/* ══════════════════════════════════
             PANEL 3
        ══════════════════════════════════ */}
        <div className="panel p3">
          <div className="p3-header">
            <div className="p3-bank-block">
              <div className="bm">बँक ऑफ महाराष्ट्र</div>
              <div className="be">Bank of Maharashtra</div>
              <div style={{ fontSize: '7px', color: '#ddd' }}>एक परिवार एक बँक</div>
            </div>
            <div className="p3-branch-date">
              <span className="p3-date-label">दिनांक /Date :</span>
              <div className="p3-date-boxes">
                {dateChars.map((char, index) => (
                  <div key={`d3-${index}`} className="dbox">{char.trim()}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="p3-body">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '3px' }}>
                <div style={{ display: 'flex', border: '1.5px solid #555', height: '26px', width: '140px', flexShrink: 0 }}>
                  <div style={{ width: '26px', background: '#e8e8e8', borderRight: '1.5px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', flexShrink: 0 }}>₹</div>
                  <div className="val-line val-line-amount"><span className="val-text amount-val">{amount}</span></div>
                </div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 900, marginBottom: '3px' }}>SB/CA/OD/CC/RD/TL/DL/A/c No./Credit Card No.</div>
              <div className="p3-acboxes" style={{ overflow: 'hidden' }}>
                {accChars.map((char, index) => (
                  <div key={`a3-${index}`} className="dbox">{char.trim()}</div>
                ))}
              </div>
            </div>

            <div className="field-row">
              <label>नाव /Name :</label>
              <div className="val-line"><span className="val-text">{accountHolderName}</span></div>
            </div>

            <div className="field-row">
              <label>टेलिकोन नं./मोबाईल नं. / Tel. No./Mobile No.</label>
              <div className="val-line"><span className="val-text">{mobileNumber}</span></div>
            </div>

            <div className="field-row">
              <label>ई- मेल आयडी /E-mail ID :</label>
              <div className="val-line"><span className="val-text">{email}</span></div>
            </div>

            <div className="field-row">
              <label>अक्षरी रक्कम रु. /Rupees in Words :</label>
              <div className="val-line"><span className="val-text">{amountInWords}</span></div>
            </div>

            <table className="p3chtable">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', width: '55%' }}>Cash/Cheque Date &amp; Name of Bank &amp; Branch</th>
                  <th>₹</th>
                  <th>Ps.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fill-blue font-bold px-1" style={{fontSize: '11px'}}>{chequeNumber} - {chequeBank}</td>
                  <td className="fill-blue text-center font-bold">{amount}</td>
                  <td className="fill-blue text-center font-bold">00</td>
                </tr>
                <tr><td style={{ height: '36px' }}></td><td></td><td></td></tr>
                <tr><td style={{ height: '36px' }}></td><td></td><td></td></tr>
                <tr className="trow">
                  <td style={{ textAlign: 'right' }}>एकुण/ Total</td>
                  <td className="fill-blue text-center font-bold">{amount}</td>
                  <td className="fill-blue text-center font-bold">00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p3-bottom">
            <div className="p3-bottom-cell">SWO</div>
            <div className="p3-bottom-cell">
              <div>Transaction ID</div>
              <div className="txn-input"></div>
            </div>
            <div className="p3-bottom-cell">Passing Officer</div>
            <div className="p3-bottom-cell">जमा करणार/<br/>Signature of Depositor</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DepositChequeSlip;
