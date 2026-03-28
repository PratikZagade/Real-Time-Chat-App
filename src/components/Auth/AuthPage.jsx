import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthToggle from "./AuthToggle";
import AuthForm from "./AuthForm";

// ✅ TOAST
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // ✅ AUTO REDIRECT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">

      <div className="row w-100 shadow-lg rounded overflow-hidden" style={{ maxWidth: "900px" }}>
        
        {/* 🔵 LEFT SIDE (Branding / Chat Look) */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-4">
          <h2 className="fw-bold mb-3">ChatApp 💬</h2>
          <p className="text-center">
            Connect instantly with your friends in real-time.
            Fast, secure and simple chat experience.
          </p>
        </div>

        {/* ⚪ RIGHT SIDE (Auth Form) */}
        <div className="col-md-6 bg-white p-4">

          <div className="text-center mb-3">
            <h4 className="fw-bold">
              {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
            </h4>
            <p className="text-muted small">
              {isLogin
                ? "Login to continue chatting"
                : "Register to start chatting"}
            </p>
          </div>

          {/* 🔘 Toggle */}
          <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

          {/* 🧾 Form */}
          <AuthForm isLogin={isLogin} />

        </div>
      </div>

      {/* ✅ TOAST (UNCHANGED) */}
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default AuthPage;