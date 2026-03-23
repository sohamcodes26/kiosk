import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Landmark, Car, Home, GraduationCap, Briefcase, FileText, PiggyBank, HandCoins, CheckCircle, Info } from 'lucide-react';

const BankBrochure = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [callbackStage, setCallbackStage] = useState('initial'); // 'initial', 'form', 'success'
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
      setCallbackStage('initial');
      setCustomerName('');
      setCustomerMobile('');
    } else {
      navigate('/');
    }
  };

  const brochureItems = [
    {
      id: "govt",
      title: "Government Schemes",
      subtitle: "PMJDY / APY / PMJJBY",
      description: "Avail benefits of central schemes like Atal Pension Yojana & PM Jeevan Jyoti Bima.",
      icon: <Landmark size={24} className="text-[#0B4084]" />,
      rate: "Social Security Backing",
      imageUrl: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=600&h=300",
      popular: true,
      details: "Bank of Maharashtra is proud to partner with the Government of India to bring you essential financial security and insurance schemes directly to you.",
      features: [
        "Pradhan Mantri Jan Dhan Yojana (PMJDY) - Zero balance account.",
        "Atal Pension Yojana (APY) - Guaranteed minimum pension.",
        "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) - Life insurance.",
        "Pradhan Mantri Suraksha Bima Yojana (PMSBY) - Accidental cover."
      ]
    },
    {
      id: "agri",
      title: "Agriculture Loans",
      subtitle: "Kisan Credit Card (KCC)",
      description: "Empowering farmers with KCC, tractor loans, and allied agricultural activities.",
      icon: <HandCoins size={24} className="text-[#0B4084]" />,
      rate: "Subsidized Agri Rates",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600&h=300",
      popular: true,
      details: "Our agriculture loans are tailored to meet the dynamic needs of farmers, ensuring they have the right financial support at the right time.",
      features: [
        "Kisan Credit Card (KCC) for easy short-term credit limits.",
        "Loans for advanced irrigation, tractors, and farm machinery.",
        "Financing for dairy, poultry, and fisheries.",
        "Low interest rates with applicable government subvention."
      ]
    },
    {
      id: "home",
      title: "Maha Super Housing Loan",
      subtitle: "Your Dream, Our Promise",
      description: "Low-interest home loans for purchasing, constructing, or renovating your dream home.",
      icon: <Home size={24} className="text-[#0B4084]" />,
      rate: "Starting @ 8.35% p.a.",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600&h=300",
      popular: false,
      details: "Own your dream home with the Maha Super Housing Loan. Enjoy high loan amounts, lowest EMIs in the market, and rapid processing.",
      features: [
        "No pre-payment or foreclosure charges whatsoever.",
        "Extended flexible repayment tenure up to 30 years.",
        "Concession in interest rates for women borrowers.",
        "Minimal documentation and transparent processing."
      ]
    },
    {
      id: "car",
      title: "Maha Super Car Loan",
      subtitle: "Drive home your success",
      description: "Drive your dream vehicle with up to 90% financing on the on-road price. No pre-payment penalty.",
      icon: <Car size={24} className="text-[#0B4084]" />,
      rate: "Starting @ 8.70% p.a.",
      imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600&h=300",
      popular: false,
      details: "Whether it's your first car or an upgrade, the Maha Super Car Loan finances up to 90% of the on-road price to get you driving faster.",
      features: [
        "Finance covers Cost of Vehicle, RTO, and Insurance.",
        "Lowest EMI options tailored for salaried and business profiles.",
        "Zero processing fees during festive promotional periods.",
        "Approval within 48 hours with complete documentation."
      ]
    },
    {
      id: "edu",
      title: "Education Loan",
      subtitle: "Invest in knowledge",
      description: "Affordable education loans for higher studies in India and globally.",
      icon: <GraduationCap size={24} className="text-[#0B4084]" />,
      rate: "Interest Subsidy Available",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&h=300",
      popular: false,
      details: "Empower your career with affordable financial assistance for pursuing higher education in premier institutions across India and abroad.",
      features: [
        "Covers tuition, hostel, laptop, and travel expenses.",
        "Attractive interest rates with Central Govt. Interest Subsidy.",
        "Repayment holiday/Moratorium during the study period.",
        "Easy online application through Vidya Lakshmi Portal."
      ]
    },
    {
      id: "fd",
      title: "Fixed Deposits",
      subtitle: "Secure & Steady Returns",
      description: "Secure your savings with our attractive interest rates. Special rates for seniors.",
      icon: <PiggyBank size={24} className="text-[#0B4084]" />,
      rate: "Up to 7.25% p.a. returns",
      imageUrl: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=80&w=600&h=300",
      popular: false,
      details: "Grow your wealth with absolutely zero risk. Our Term Deposits offer guaranteed returns with the flexibility of varying durations.",
      features: [
        "Additional 0.50% interest for Senior Citizens.",
        "Loan and Overdraft facility available against the deposit.",
        "Flexible interest payout: Monthly, Quarterly or Cumulative.",
        "Automatic renewal facility available."
      ]
    },
    {
      id: "msme",
      title: "MSME Business Loans",
      subtitle: "Fueling Enterprise Growth",
      description: "Collateral-free loans for micro, small, and medium enterprises under CGTMSE to fuel growth.",
      icon: <Briefcase size={24} className="text-[#0B4084]" />,
      rate: "Competitive Business Rates",
      imageUrl: "https://images.unsplash.com/photo-1664575602276-cd0758ae7f61?auto=format&fit=crop&q=80&w=600&h=300",
      popular: false,
      details: "Boost your manufacturing or service enterprise with customized working capital and term loan solutions designed exclusively for MSMEs.",
      features: [
        "Collateral-free loans up to ₹200 Lakhs under CGTMSE.",
        "Mudra Loans (Shishu, Kishore, Tarun) for micro-units.",
        "Fast-track processing for GST registered MSMEs.",
        "Cash Credit and Overdraft facilities for inventory."
      ]
    },
    {
      id: "insurance",
      title: "Life & Health Insurance",
      subtitle: "Protect what matters",
      description: "Complete health, life, and asset insurance policies sourced from esteemed partners.",
      icon: <FileText size={24} className="text-[#0B4084]" />,
      rate: "Low Annual Premiums",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=600&h=300",
      popular: false,
      details: "Safeguard your family's future and your valuable assets against unforeseen circumstances with our tie-up bancassurance products.",
      features: [
        "Life Insurance policies from LIC of India & other partners.",
        "Comprehensive family floater health insurance plans.",
        "Motor and property insurance with instant issuance.",
        "Hassle-free auto-debit of premiums from your account."
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#f4f7f6]">
      <header className="flex items-center bg-[#0B4084] text-white px-8 py-5 shadow-lg border-b-4 border-[#eab308] z-10 relative">
        <button 
          onClick={handleBack} 
          className="mr-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95"
          aria-label="Go Back"
        >
          <ArrowLeft size={32} className="text-white" />
        </button>
        <div className="flex items-center gap-4">
          <Landmark size={36} className="text-[#eab308]" />
          <div>
            <h1 className="text-2xl font-bold tracking-wider uppercase">Bank of Maharashtra</h1>
            <p className="text-sm text-yellow-100 font-medium tracking-wide">
              {selectedItem ? selectedItem.title : "One Family One Bank - Official Brochure"}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto relative">
        {selectedItem ? (
          <div className="bg-white min-h-full animate-in fade-in zoom-in-95 duration-200">
            <div 
              className="w-full h-80 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${selectedItem.imageUrl}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B4084] to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-12 w-full">
                {selectedItem.popular && (
                  <span className="inline-block bg-[#eab308] text-black font-bold px-4 py-1.5 rounded-full text-sm mb-4 shadow-md">
                    ★ POPULAR SCHEME
                  </span>
                )}
                <div className="flex items-center gap-4 text-white">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/30">
                     {React.cloneElement(selectedItem.icon, { className: "text-white", size: 36 })}
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold font-serif mb-2 tracking-wide">{selectedItem.title}</h2>
                    <p className="text-xl text-blue-100 font-medium">{selectedItem.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto p-12 py-16 grid grid-cols-3 gap-12">
              <div className="col-span-2">
                <h3 className="text-3xl font-bold text-[#1f2937] mb-6">About the Product</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-10">
                  {selectedItem.details}
                </p>

                <h3 className="text-2xl font-bold text-[#1f2937] mb-6">Key Features & Benefits</h3>
                <ul className="space-y-5">
                  {selectedItem.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={26} />
                      <span className="text-xl text-gray-700 font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#f0f5ff] rounded-xl p-8 border-2 border-[#dbeafe] h-fit">
                <div className="text-center mb-8">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Interest Rate / Benefit</p>
                  <p className="text-3xl font-bold text-[#0B4084] bg-white py-4 rounded-lg shadow-sm border border-blue-100">
                    {selectedItem.rate}
                  </p>
                </div>
                
                <hr className="border-blue-200 mb-8" />
                
                <div className="bg-[#0B4084] text-white p-6 rounded-lg text-left mb-4 min-h-[220px] flex flex-col justify-center">
                  {callbackStage === 'initial' && (
                    <div className="text-center animate-in fade-in">
                      <p className="font-bold text-lg mb-2">Interested?</p>
                      <p className="text-blue-100 text-sm mb-6">Leave your number and our branch executive will contact you right away.</p>
                      <button 
                        onClick={() => setCallbackStage('form')}
                        className="w-full bg-[#eab308] hover:bg-yellow-400 text-black font-bold py-3 rounded text-lg transition-colors active:scale-95 shadow-md"
                      >
                        Request Callback
                      </button>
                    </div>
                  )}

                  {callbackStage === 'form' && (
                    <div className="animate-in fade-in zoom-in-95 duration-200">
                      <p className="font-bold text-lg mb-4 text-center text-[#eab308]">Contact Details</p>
                      <input 
                        type="text" 
                        placeholder="Your Full Name" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full mb-3 p-3 rounded text-black font-medium border-2 border-transparent focus:border-[#eab308] outline-none shadow-inner"
                      />
                      <input 
                        type="tel" 
                        placeholder="Mobile Number" 
                        value={customerMobile}
                        onChange={(e) => setCustomerMobile(e.target.value)}
                        className="w-full mb-5 p-3 rounded text-black font-medium border-2 border-transparent focus:border-[#eab308] outline-none shadow-inner"
                      />
                      <button 
                        onClick={() => { 
                          if(customerName.trim() && customerMobile.trim()) {
                            setCallbackStage('success'); 
                          } else {
                            alert('Please enter both name and mobile number.');
                          }
                        }}
                        className="w-full bg-[#eab308] hover:bg-yellow-400 text-black font-bold py-3 rounded text-lg transition-colors active:scale-95 shadow-md"
                      >
                        Submit Request
                      </button>
                    </div>
                  )}

                  {callbackStage === 'success' && (
                    <div className="animate-in fade-in zoom-in-95 duration-300 text-center py-4">
                      <CheckCircle className="text-[#eab308] mx-auto mb-3" size={48} />
                      <p className="font-bold text-xl mb-2">Request Received!</p>
                      <p className="text-blue-100 text-sm">Thank you {customerName}. Our branch executive will call you shortly.</p>
                    </div>
                  )}
                </div>

                <div className="text-center mt-6">
                   <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                     <Info size={16} /> Contact Branch for T&C
                   </p>
                </div>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="p-12">
            <div className="max-w-[1400px] mx-auto">
              
              <div className="text-center mb-10">
                <h2 className="text-4xl font-serif font-bold text-[#0B4084] mb-4">Financial Products & Services</h2>
                <div className="w-24 h-1.5 bg-[#eab308] mx-auto mb-6"></div>
                <p className="text-xl text-gray-700 font-medium max-w-4xl mx-auto">
                  Browse our comprehensive suite of banking instruments. Designed to meet the unique needs of individuals, businesses, and farmers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
                {brochureItems.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white border focus:outline-none focus:ring-4 focus:ring-blue-300 border-gray-200 shadow-md rounded-xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="h-44 w-full relative overflow-hidden bg-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {item.popular && (
                        <div className="absolute top-4 right-4 z-20 bg-[#eab308] text-xs font-bold px-3 py-1 rounded-full shadow-md text-black">
                          POPULAR
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                          {React.cloneElement(item.icon, { className: 'text-white', size: 24 })}
                        </div>
                        <h3 className="text-white font-bold text-xl drop-shadow-md pr-2">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-6 flex-grow">
                        {item.description}
                      </p>
                      <div className="mt-auto w-full bg-[#0B4084] border border-[#0B4084] py-3 px-4 rounded-xl font-bold text-white text-sm tracking-wide text-center transition-colors shadow-sm">
                        Learn More →
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-200 text-center py-4 text-gray-600 text-sm border-t border-gray-300 font-medium z-10">
        Toll Free Number: 1800-233-4526 | Website: www.bankofmaharashtra.in | Safe & Secure Kiosk Portal
      </footer>
    </div>
  );
};

export default BankBrochure;
