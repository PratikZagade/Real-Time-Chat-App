import { useState } from "react";
import { registerUser } from "../../api/authService";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);
      alert("User Registered Successfully ✅");

      // ✅ Clear form after success
      setForm({
        username: "",
        email: "",
        password: "",
      });

    } catch (err) {
      console.error(err);
      alert("Registration Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>

        <h3 className="text-center mb-4 fw-bold">Register 🚀</h3>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="registerUsername"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />
            <label htmlFor="registerUsername">Username</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="registerEmail"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
            <label htmlFor="registerEmail">Email address</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="registerPassword"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
            <label htmlFor="registerPassword">Password</label>
          </div>

          {/* Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success btn-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Please wait...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Register;