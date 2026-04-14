# SARAL MARG KIOSK - Bank of Maharashtra

A comprehensive kiosk banking application designed for the **Bank of Maharashtra**. This application simplifies core banking services such as withdrawals, deposits, fixed deposits, and account statements through an intuitive, biometric-secured interface.

## 🚀 Key Features

### 🏢 Banking Services
- **Balance Inquiry**: Real-time balance retrieval with a unified UI.
- **Statements**: Generate Mini Statements (last 5 transactions) and Full Statements with date range filtering.
- **Fixed Deposit (FD)**: Open FDs instantly with automated balance validation and maturity calculation.
- **Cash Deposit**: Dynamic cash deposit system with denominations breakdown (₹2000, ₹500, ₹200, ₹100, ₹50, ₹20, ₹10, ₹5).
- **Cash Withdrawal**: Secure cash withdrawal logic with real-time balance updates.

### 🛡️ Security & Authentication
- **Biometric Login**: Simulated fingerprint authentication for secure session entry.
- **Alternative Login**: Support for Phone & OTP or PIN-based login methods.
- **PIN Management**: Secure PIN change functionality.

### 🛠️ Admin Terminal
- **Transaction Monitoring**: Real-time tracking of all kiosk operations.
- **Analytics**: Business intelligence dashboard for terminal performance.
- **User Management**: Automatic dummy user initialization for rapid demo deployment.

## 💻 Tech Stack
- **Frontend**: React.js with TailwindCSS (Vanilla CSS for custom styling).
- **Backend**: Node.js & Express.
- **Database**: MongoDB (Atlas) for secure data persistence.
- **Icons**: Lucide React for consistent UI iconography.

## 🛠️ Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sohamcodes26/kiosk.git
   ```

2. **Backend Setup**:
   ```bash
   cd kiosk/server
   npm install
   # Create a .env file with your MONGO_URI
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd kiosk/client
   npm install
   npm start
   ```

---
© 2026 Bank of Maharashtra • One Family One Bank
