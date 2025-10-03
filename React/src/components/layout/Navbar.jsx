import { formatDate } from "../../utils/helpers";
import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // ✅ added useSelector
import { logout } from "../../store/authSlice";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get user & role from Redux
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to login after logout
  };
   const niki= "shreedhar niki"
  return (
    <header className="navbar">
      <h1 className="navbar-title">Admin Dashboard</h1>
      {formatDate(new Date())}
      <div className="navbar-user" ref={dropdownRef}>
        <button
          className="user-button"
          onClick={() => setOpen((prev) => !prev)}
        >
          👤 {user?.name || niki} ({role || "no role"}) ▾
        </button>

        {open && (
          <div className="dropdown">
            <Link to="/profile" className="dropdown-item">
               Profile
            </Link>
            <Link to="/change-password" className="dropdown-item">
              Change Password
            </Link>
            <Link to="/settings" className="dropdown-item">
              Settings
            </Link>
            <button className="dropdown-item logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
