const AuthToggle = ({ isLogin, setIsLogin }) => {
  return (
    <div className="mb-4">

      <ul className="nav nav-pills nav-justified bg-light rounded p-1">

        {/* Register Tab */}
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link fw-semibold ${
              !isLogin ? "active" : "text-dark"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </li>

        {/* Login Tab */}
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link fw-semibold ${
              isLogin ? "active" : "text-dark"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </li>

      </ul>

    </div>
  );
};

export default AuthToggle;