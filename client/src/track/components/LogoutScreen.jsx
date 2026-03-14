import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutScreen = ({ isOpen, onClose }) => {
    
  const navigate = useNavigate();

  

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  const handleContinue = () => {
    // Just close the popup and stay on the current screen
    onClose(); 
  };

  const handleCancel = () => {
    // Send them back to the start screen and close the session
    navigate('/'); 
  };

  

  return (
    // Fixed overlay with a dark semi-transparent background (bg-black/60)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-sans backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="bg-[#f7f7f5] rounded-xl shadow-2xl py-16 px-12 flex flex-col items-center w-[800px] text-center animate-in fade-in zoom-in duration-200">
        
        <h2 className="text-[44px] font-medium text-black mb-4">
          Are you sure?
        </h2>
        
        <p className="text-[22px] text-black mb-14">
          Please note that once canceled, you will need to restart from the beginning.
        </p>
        
        {/* Buttons */}
        <div className="flex gap-8 w-full justify-center">
          <button 
            onClick={handleContinue}
            className="bg-[#155ed4] hover:bg-blue-700 text-white font-semibold text-2xl py-5 rounded-xl shadow-md transition-all active:scale-95 w-72"
          >
            Continue Process
          </button>
          
          <button 
            onClick={handleCancel}
            className="bg-[#d31515] hover:bg-red-700 text-white font-semibold text-2xl py-5 rounded-xl shadow-md transition-all active:scale-95 w-72"
          >
            Cancel Process
          </button>
        </div>

      </div>

    </div>
  );
};

export default LogoutScreen;