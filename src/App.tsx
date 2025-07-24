import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RoutesConfig from "./routes";
import { NameModal } from "~/components";
import { Laptop, Smartphone } from "lucide-react";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [isMobile, setIsMobile] = useState(false);

  const handleNameSet = () => {
    setUserName(localStorage.getItem("userName") || "");
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!userName) {
      setIsModalOpen(true);
    }
  }, [userName]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-indigo-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <Laptop className="w-24 h-24 text-indigo-700 mx-auto animate-float" />
            <Smartphone
              className="w-16 h-16 text-red-500 absolute -bottom-4 -right-4 animate-wiggle"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          <span className="inline-block animate-bounce">📵</span> Mobile View
          Not Supported
        </h1>

        <p className="text-lg text-gray-800 mb-6 max-w-md">
          This experience is optimized for larger screens. Please switch to a
          desktop or laptop for full access.
        </p>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-wiggle {
            animation: wiggle 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <NameModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNameSet={handleNameSet}
      />
      <RoutesConfig />
    </Router>
  );
};

export default App;
