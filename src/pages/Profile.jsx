import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar showLogout={true} />
      <div
        className="d-flex flex-column align-items-center vh-100"
        style={{
          background: "linear-gradient(to bottom, #4b0082, #000000)",
          paddingTop: "50px",
        }}
      >
        {/* Clean and bold heading */}
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: "#ffffff",
            textShadow: "0 0 12px rgba(138, 43, 226, 0.8)",
            marginBottom: "40px",
            letterSpacing: "1.5px",
          }}
        >
          Your Profile
        </h2>

        {/* Profile image container */}
        <div className="d-flex align-items-center mb-4">
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #9b5de5",
              boxShadow: "0 0 20px rgba(155, 93, 229, 0.7)",
              background: "radial-gradient(circle, #3d1a78 0%, #1f1235 100%)",
            }}
          >
            <img
              src=""
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "none",
              }}
            />
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="p-5 text-white"
          style={{
            width: "100%",
            maxWidth: "650px",
            backgroundColor: "#1f1235",
            borderRadius: "24px",
            boxShadow: "0 6px 14px rgba(0, 0, 0, 0.45)",
            border: "1px solid #2d1e50",
            fontSize: "1.1rem",
          }}
        >
          <p>
            <strong>Full Name:</strong> {user?.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
          <p>
            <strong>Major:</strong> {user?.major}
          </p>
          <p>
            <strong>Gender:</strong> {user?.gender}
          </p>

          <div className="d-flex justify-content-end">
            <button
              className="btn mt-3"
              style={{
                backgroundColor: "#6C4AB6",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
