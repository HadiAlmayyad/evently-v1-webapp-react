import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import landingImg from "../assets/landing_page_main_image.jpg";
import feature1 from "../assets/feature1_events.png";
import feature2 from "../assets/feature2_ratings.png";

function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-scroll").forEach((el) => observer.observe(el));
    return () => {
      document.querySelectorAll(".fade-scroll").forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom, #4b0082, #000000)",
        color: "white",
        overflowX: "hidden",
      }}
    >
      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

        .fade-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease-out;
        }
        .fade-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .feature-img {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .feature-img:hover {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(162, 89, 255, 0.5);
        }
        .hero-text {
          opacity: 0;
          transform: translateY(40px);
          animation: slideUpFade 1s ease-out 0.3s forwards;
        }
        .hero-image {
          opacity: 0;
          transform: translateX(60px);
          animation: slideRightFade 1.1s ease-out 0.5s forwards;
        }
        @keyframes slideUpFade {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRightFade {
          to { opacity: 1; transform: translateX(0); }
        }
        footer {
          background-color: #0e0b1c;
          border-top: 1px solid #A259FF;
          padding: 40px 0 20px;
          text-align: center;
        }
        .footer-icon {
          font-size: 1.5rem;
          color: #A259FF;
          margin: 0 10px;
          transition: transform 0.3s ease;
        }
        .footer-icon:hover {
          transform: scale(1.2);
          color: white;
        }
        .footer-text {
          color: white;
          font-size: 0.9rem;
          margin-top: 10px;
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold" style={{ color: "#A259FF", fontSize: "24px" }}>
            Evently
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#landingNav"
            aria-controls="landingNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="landingNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#home" className="nav-link text-white mx-2">Home</a>
              </li>
              <li className="nav-item">
                <a href="#features" className="nav-link text-white mx-2">Features</a>
              </li>
              <li className="nav-item">
                <a href="#footer" className="nav-link text-white mx-2">Contact</a>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white mx-2">Login / Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="container" style={{ paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="row align-items-center justify-content-between">
          <div className="col-md-6 mb-5 mb-md-0 hero-text">
            <h1 className="display-4 fw-bold mb-4">
              Eventually you will use <span style={{ color: "#A259FF" }}>Evently</span>!
            </h1>
            <p className="lead text-white-50 mb-4">
              A smart and simple platform for KFUPM students to discover, manage and organise campus events.
            </p>
            <a
              href="#features"
              className="btn btn-lg text-white"
              style={{ backgroundColor: "#6C4AB6", borderRadius: "10px" }}
            >
              Get Started
            </a>
          </div>

          <div className="col-md-6 text-center hero-image">
            <div
              style={{
                borderRadius: "16px",
                background: "radial-gradient(circle, #a259ff 0%, #4b0082 80%)",
                boxShadow: "0 0 20px rgba(162, 89, 255, 0.5)",
                overflow: "hidden",
              }}
            >
              <img
                src={landingImg}
                alt="KFUPM"
                className="img-fluid"
                style={{ objectFit: "cover", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5" style={{ backgroundColor: "#1f1235" }}>
        <div className="container">
          <h2 className="fw-bold text-center mb-5" style={{ fontSize: "2.8rem", color: "#A259FF", textShadow: "0 0 10px rgba(162, 89, 255, 0.6)" }}>
            Features
          </h2>

          {/* Feature 1 */}
          <div className="row align-items-center mb-5 fade-scroll">
            <div className="col-md-6">
              <div className="bg-dark rounded p-2">
                <div className="d-flex gap-2 mb-2">
                  <span className="bg-danger rounded-circle" style={{ width: 12, height: 12 }}></span>
                  <span className="bg-warning rounded-circle" style={{ width: 12, height: 12 }}></span>
                  <span className="bg-success rounded-circle" style={{ width: 12, height: 12 }}></span>
                </div>
                <img src={feature1} alt="Feature 1" className="img-fluid rounded feature-img" />
              </div>
            </div>
            <div className="col-md-6 text-white ps-md-5 mt-4 mt-md-0">
              <h4 className="fw-bold mb-3">See All Campus Events</h4>
              <p className="text-white-50">
                You can see the events in KFUPM and explore what’s happening across campus.
                Filter by category, time, or organiser and stay updated.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="row align-items-center flex-md-row-reverse fade-scroll">
            <div className="col-md-6">
              <div className="bg-dark rounded p-2">
                <div className="d-flex gap-2 mb-2">
                  <span className="bg-danger rounded-circle" style={{ width: 12, height: 12 }}></span>
                  <span className="bg-warning rounded-circle" style={{ width: 12, height: 12 }}></span>
                  <span className="bg-success rounded-circle" style={{ width: 12, height: 12 }}></span>
                </div>
                <img src={feature2} alt="Feature 2" className="img-fluid rounded feature-img" />
              </div>
            </div>
            <div className="col-md-6 text-white pe-md-5 mt-4 mt-md-0">
              <h4 className="fw-bold mb-3">Rate Events After Attending</h4>
              <p className="text-white-50">
                You can rate events after attending them and share your feedback with organisers
                to help improve future experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="container">
          <div className="d-flex justify-content-center gap-3 mb-2">
            <a
              href="https://github.com/KenanKaddoura"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              title="GitHub - Kenan"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://github.com/software1337x"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              title="GitHub - software1337x"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
          <div className="footer-text">
            Built by <strong>Team Evently</strong> — KFUPM • All rights reserved © 2025
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;


