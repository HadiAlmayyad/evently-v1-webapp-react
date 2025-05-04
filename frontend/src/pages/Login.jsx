// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterEv from "../components/FooterEv";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [stuId, setStuId] = useState("")

  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
  
    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/signup";
  
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin ? { email, password } : { fullName, email, password, stuId }
        ),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.message || "Authentication failed");
  
      // Save token if you are using it later
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Fetch full user profile using ID (assumes `data.user._id` is returned from backend)
      const profileRes = await fetch(`http://localhost:5000/api/users/${data.user._id}`);
      const fullUser = await profileRes.json();

      localStorage.setItem("user", JSON.stringify(fullUser));
      navigate("/profile");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };
  
  return (
    <>
      <Navbar showLogout={false} />
      <div
        className="d-flex justify-content-center align-items-center vh-100 px-3"
        style={{ background: "linear-gradient(to bottom, #4b0082, #000000)" }}
      >
        <div
          className="p-5 text-white w-100"
          style={{
            maxWidth: "500px",
            backgroundColor: "#1f1235",
            border: "1px solid #2d1e50",
            borderRadius: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          }}
        >
          <h2 className="text-center mb-4">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>

          {!isLogin && (
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}
          {!isLogin && (
            <>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Student ID"
                value={stuId}
                onChange={(e) => setStuId(e.target.value)}
              />
            </>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "#6C4AB6",
                border: "none",
                borderRadius: "8px",
              }}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-3">
            {isLogin ? (
              <>
                <span>Don’t have an account? </span>
                <span
                  style={{ color: "#A259FF", cursor: "pointer" }}
                  onClick={toggleForm}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                <span>Already have an account? </span>
                <span
                  style={{ color: "#A259FF", cursor: "pointer" }}
                  onClick={toggleForm}
                >
                  Log In
                </span>
              </>
            )}
          </div>

          {errorMsg && (
            <div className="text-danger text-center mt-2">
              {errorMsg}
            </div>
          )}
        </div>
      </div>
      <FooterEv />
    </>
  );
}

export default Login;