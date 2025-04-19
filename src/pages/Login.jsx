import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterEv from "../components/FooterEv";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dummyUsers = [
    {
      fullName: "Ali Al-Qahtani",
      email: "ali@example.com",
      password: "123456",
      role: "Attendee",
      id: "202012345",
      major: "Software Engineering",
      gender: "Male",
    },
    {
      fullName: "Sarah Organiser",
      email: "sarah@org.com",
      password: "123456",
      role: "Organiser",
      id: "202045678",
      major: "Event Management",
      gender: "Female",
    },
    {
      fullName: "Admin User",
      email: "admin@admin.com",
      password: "admin123",
      role: "Admin",
      id: "000000001",
      major: "System Management",
      gender: "N/A",
    },
  ];

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const matchedUser = dummyUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (matchedUser) {
        const savedProfile = localStorage.getItem(`profile_${matchedUser.email}`);
        const finalUser = savedProfile ? JSON.parse(savedProfile) : matchedUser;

        localStorage.setItem("user", JSON.stringify(finalUser));
        navigate("/profile");
      } else {
        alert("Invalid email or password");
      }
    } else {
      alert("Signup not implemented. Use Log In instead.");
    }
  };

  return (
    <>
      <Navbar showLogout={false} />
      <div
        className="d-flex justify-content-center align-items-center vh-100 px-3"
        style={{
          background: "linear-gradient(to bottom, #4b0082, #000000)",
        }}
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
        </div>
      </div>

      <FooterEv />
    </>
  );
}

export default Login;

