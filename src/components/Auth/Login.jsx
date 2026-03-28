import { useState } from "react";
import { loginUser } from "../../api/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(form); // ✅ token + user already saved

      alert("Login Success ✅");

      navigate("/chat");

    } catch (err) {
      console.error(err);
      alert("Invalid Credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>

        <h3 className="text-center mb-4 fw-bold">Login 💬</h3>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
            <label htmlFor="loginEmail">Email address</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
            <label htmlFor="loginPassword">Password</label>
          </div>

          {/* Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Please wait...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;