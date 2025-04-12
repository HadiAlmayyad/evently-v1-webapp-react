
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Navbar showLogout={false} /> {}
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to bottom, #4b0082, #000000)" }}>
        <div className="card p-5" style={{ width: "100%", maxWidth: "500px", backgroundColor: "#1A1A1A", borderRadius: "20px", color: "white" }}>
          <h2 className="text-center mb-4">{isLogin ? "Welcome Back!" : "Create Account"}</h2>

          <form>
            <div className="form-group mb-3">
              <input type="email" className="form-control" placeholder="Email address" />
            </div>

            <div className="form-group mb-3">
              <input type="password" className="form-control" placeholder="Password" />
            </div>

            {!isLogin && (
              <div className="form-group mb-3">
                <input type="text" className="form-control" placeholder="Full Name" />
              </div>
            )}

            {isLogin && (
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#6C4AB6", border: "none", borderRadius: "8px" }}>
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-3">
            {isLogin ? (
              <>
                <span>Don’t have an account? </span>
                <span style={{ color: "#A259FF", cursor: "pointer" }} onClick={toggleForm}>Sign Up</span>
              </>
            ) : (
              <>
                <span>Already have an account? </span>
                <span style={{ color: "#A259FF", cursor: "pointer" }} onClick={toggleForm}>Log In</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
