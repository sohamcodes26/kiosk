import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalTransactions: 0,
    todayActivity: 0
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");

  // Time updater
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch report
  const fetchReport = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/report", {
        params: {
          startDate,
          endDate,
          type: selectedType,
        },
      });

      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/analytics");
      setAnalytics(res.data.analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  // Initial load or filter change
  useEffect(() => {
    fetchReport();
    fetchAnalytics();
  }, [selectedType, startDate, endDate]);

  const setQuickRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    const formatDateInput = (d) => d.toISOString().split("T")[0];

    setStartDate(formatDateInput(start));
    setEndDate(formatDateInput(end));
  };

  const downloadCSV = () => {
    window.open("http://localhost:8000/api/admin/download-report", "_blank");
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const StatCard = ({ title, value, color, icon }) => (
    <div className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${color} flex flex-col justify-between`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-lg bg-opacity-10 ${color.replace('border-', 'bg-')}`}>
           {icon}
        </div>
      </div>
      <span className="text-2xl font-bold text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full bg-[#e9eff6] font-sans">

      {/* HEADER */}
      <header className="flex justify-between items-center bg-[#004b9b] text-white px-8 py-4 shadow-md">
        <div>
          <h1 className="text-xl font-bold uppercase">Maharashtra State Bank</h1>
          <p className="text-[10px] font-bold text-blue-100/60 uppercase tracking-widest">
            Admin Management Terminal
          </p>
        </div>

        <div className="text-right flex items-center gap-6">
          <div className="hidden md:block">
            <p className="text-lg font-bold">{formatTime(currentTime)}</p>
            <p className="text-[10px] text-blue-100/50 font-bold uppercase">{formatDate(currentTime)}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-2 rounded-xl transition-all active:scale-95 shadow-md text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* ANALYTICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard 
              title="Total Deposits" 
              value={`₹${analytics.totalDeposits.toLocaleString()}`} 
              color="border-emerald-500" 
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>}
            />
            <StatCard 
              title="Total Withdrawals" 
              value={`₹${analytics.totalWithdrawals.toLocaleString()}`} 
              color="border-rose-500"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>}
            />
            <StatCard 
              title="Total Transactions" 
              value={analytics.totalTransactions} 
              color="border-blue-500"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>}
            />
            <StatCard 
              title="Today's Activity" 
              value={analytics.todayActivity} 
              color="border-amber-500"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* TOOLBAR */}
            <div className="p-6 border-b bg-gray-50 flex flex-wrap justify-between items-end gap-6">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</label>
                  <select
                    className="border border-gray-200 p-2.5 rounded-lg text-xs font-bold text-[#004b9b] outline-none focus:border-[#004b9b] transition-all bg-white"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="ALL">All Categories</option>
                    <option value="WITHDRAW">Withdrawals</option>
                    <option value="DEPOSIT">Deposits</option>
                    <option value="REQUEST">Requests</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">From</label>
                  <input
                    type="date"
                    className="border border-gray-200 p-2.5 rounded-lg text-xs font-bold text-gray-700 outline-none focus:border-[#004b9b] bg-white"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">To</label>
                  <input
                    type="date"
                    className="border border-gray-200 p-2.5 rounded-lg text-xs font-bold text-gray-700 outline-none focus:border-[#004b9b] bg-white"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <button
                  onClick={downloadCSV}
                  className="bg-gray-800 text-white font-bold px-5 py-3 rounded-lg text-xs transition-all hover:bg-black active:scale-95 shadow-sm flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Export CSV
                </button>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setQuickRange(7)} className="text-[10px] font-bold uppercase text-gray-400 border border-gray-200 px-4 py-1.5 rounded-full hover:bg-[#004b9b] hover:text-white transition-all">Last 7d</button>
                <button onClick={() => setQuickRange(30)} className="text-[10px] font-bold uppercase text-gray-400 border border-gray-200 px-4 py-1.5 rounded-full hover:bg-[#004b9b] hover:text-white transition-all">Last 30d</button>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-left">
                <thead className="bg-[#004b9b] text-white sticky top-0 z-10">
                  <tr className="text-[10px] font-bold uppercase tracking-wider">
                    <th className="p-5">Transaction Type</th>
                    <th className="p-5">User ID</th>
                    <th className="p-5 text-right">Amount (INR)</th>
                    <th className="p-5 text-center">Status</th>
                    <th className="p-5">Timestamp</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600 italic">
                  {transactions.length > 0 ? (
                    transactions.map((item, index) => (
                      <tr key={index} className="hover:bg-blue-50/30 transition-all">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${item.type === 'DEPOSIT' ? 'bg-emerald-500' : item.type === 'WITHDRAW' ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
                            <div className="flex flex-col">
                              <span className="text-gray-800 font-bold uppercase tracking-tight">{item.type}</span>
                              <span className="text-[9px] text-gray-400 font-bold uppercase italic">{item.subType || "Generic"}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 font-mono text-[10px] text-gray-400">{item.userId}</td>
                        <td className={`p-5 text-right font-bold text-lg ${item.type === 'DEPOSIT' ? 'text-emerald-600' : item.type === 'WITHDRAW' ? 'text-rose-600' : 'text-gray-400'}`}>
                          {item.type === 'REQUEST' ? '---' : `₹${item.amount.toLocaleString()}`}
                        </td>
                        <td className="p-5 text-center">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${item.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-5 text-[10px] font-bold text-gray-400">
                          {new Date(item.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-16 text-center text-gray-300 font-bold uppercase tracking-widest text-sm">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t p-3 text-center">
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">Maharashtra State Bank • Admin Infrastructure Layer</p>
      </footer>

    </div>
  );
}