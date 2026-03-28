import { useState, useEffect } from "react";
import { registerUser, loginUser } from "../../api/authService";
import { toast } from "react-toastify";

const AuthForm = ({ isLogin }) => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ RESET FORM WHEN SWITCHING LOGIN ↔ REGISTER
  useEffect(() => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // 🔥 LOGIN
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        console.log("Login Success:", res.data);

        // ✅ SAVE TOKEN + USER
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ SUCCESS TOAST
        toast.success("Login Successful 🎉");

        // ✅ CLEAR FORM
        setFormData({
          username: "",
          email: "",
          password: "",
        });

        // ✅ REDIRECT AFTER DELAY
        setTimeout(() => {
          window.location.href = "/chat";
        }, 1500);

      } else {
        // 🔥 REGISTER
        const res = await registerUser(formData);

        console.log("Register Success:", res.data);

        // ✅ SUCCESS TOAST
        toast.success("User Registered Successfully ✅");

        // ✅ CLEAR FORM
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      }

    } catch (err) {
      console.error(err);

      let errorMessage = "Something went wrong ❌";

      if (typeof err.response?.data === "string") {
        errorMessage = err.response.data;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      if (
        isLogin &&
        errorMessage.toLowerCase().includes("bad credentials")
      ) {
        errorMessage = "Invalid Email or Password ❌";
      }

      toast.dismiss();
      toast.error(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Username (Register Only) */}
      {!isLogin && (
        <div className="form-floating mb-3">
          <input
            type="text"
            name="username"
            className="form-control"
            id="usernameInput"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="usernameInput">Username</label>
        </div>
      )}

      {/* Email */}
      <div className="form-floating mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          id="emailInput"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="emailInput">Email address</label>
      </div>

      {/* Password */}
      <div className="form-floating mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="passwordInput">Password</label>
      </div>

      {/* Button */}
      <div className="d-grid mb-2">
        <button
          type="submit"
          className={`btn ${isLogin ? "btn-primary" : "btn-success"} btn-lg`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Please wait...
            </>
          ) : isLogin ? (
            "Login"
          ) : (
            "Register"
          )}
        </button>
      </div>

      {/* Extra Hint */}
      <p className="text-center text-muted small mt-2">
        {isLogin
          ? "Enter your credentials to continue 💬"
          : "Create account to start chatting 🚀"}
      </p>

    </form>
  );
};

export default AuthForm;