import React, { useState } from "react";

function FooterEv() {
  const [isHovered1, setIsHovered1] = useState(false); // Hover state for first icon
  const [isHovered2, setIsHovered2] = useState(false); // Hover state for second icon

  return (
    <footer id="footer" style={styles.footer}>
      <div className="container">
        <div className="d-flex justify-content-center gap-3 mb-2">
          <a
            href="https://github.com/KenanKaddoura"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            title="GitHub - Kenan"
            style={isHovered1 ? { ...styles.footerIcon, ...styles.footerIconHover } : styles.footerIcon}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://github.com/software1337x"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            title="GitHub - software1337x"
            style={isHovered2 ? { ...styles.footerIcon, ...styles.footerIconHover } : styles.footerIcon}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div style={styles.footerText}>
          Built by <strong>Team Evently</strong> — KFUPM • All rights reserved © 2025
        </div>
      </div>
    </footer>
  );
}

// Styles object inside the component
const styles = {
  footer: {
    marginTop: "auto",
    backgroundColor: "#0e0b1c",
    borderTop: "1px solid #A259FF",
    padding: "40px 0 20px",
    textAlign: "center",
  },
  footerIcon: {
    fontSize: "1.5rem",
    color: "#A259FF",
    margin: "0 10px",
    transition: "transform 0.3s ease, color 0.3s ease",
  },
  footerIconHover: {
    transform: "scale(1.2)",
    color: "white",
  },
  footerText: {
    color: "white",
    fontSize: "0.9rem",
    marginTop: "10px",
  },
};

export default FooterEv;
