import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import FooterEv from "../components/FooterEv";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Attendee");
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin
      ? { email, password }
      : { fullName, email, password, role };

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const response = await axios.post(endpoint, payload);
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      navigate("/profile");
    } catch (err) {
      const msg = err.response?.data?.message || "Server error.";
      alert(msg);
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

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <select
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Attendee">Attendee</option>
                    <option value="Organizer">Organizer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
        </div>
      </div>
      <FooterEv />
    </>
  );
}

export default Login;
