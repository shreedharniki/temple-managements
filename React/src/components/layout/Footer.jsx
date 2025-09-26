import React from "react";
import "./Footer.css"; // reuse styles or create Footer.css if needed

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Admin Dashboard. All rights reserved.</span>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
}
