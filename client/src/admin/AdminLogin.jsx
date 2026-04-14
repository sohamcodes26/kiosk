import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@bank.com" && password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#e9eff6] flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px] border-t-4 border-[#004b9b]">
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">
          Admin Login
        </h2>
        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-8">Management Terminal</p>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 p-3 border border-gray-100 rounded-lg outline-none focus:border-[#004b9b] font-bold text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Security Password"
          className="w-full mb-6 p-3 border border-gray-100 rounded-lg outline-none focus:border-[#004b9b] font-bold text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[#004b9b] text-white py-3 rounded-lg hover:bg-[#003d7e] font-bold transition-all active:scale-95 shadow-sm"
        >
          Login to Dashboard
        </button>
      </div>
    </div>
  );
}