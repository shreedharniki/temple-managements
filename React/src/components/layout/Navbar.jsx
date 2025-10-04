// import { formatDate } from "../../utils/helpers";
// import React, { useState, useRef, useEffect } from "react";
// import "./Navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux"; // ✅ added useSelector
// import { logout } from "../../store/authSlice";
// import { FaCog,
// FaUser,
// FaLock,
// FaSignOutAlt } from "react-icons/fa";
// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // ✅ Get user & role from Redux
//   const user = useSelector((state) => state.auth.user);
//   const role = useSelector((state) => state.auth.role);

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/"); // redirect to login after logout
//   };
//    const niki= "shreedhar niki"
//   return (
//     <header className="navbar">
//       <h1 className="navbar-title">Admin Dashboard</h1>
//       {formatDate(new Date())}
//       <div className="navbar-user" ref={dropdownRef}>
//         <button
//           className="user-button"
//           onClick={() => setOpen((prev) => !prev)}
//         >
//           👤 {user?.name || niki} ({role || "no role"}) ▾
//         </button>

//         {open && (
//           <div className="dropdown">
//             <Link to="/profile" className="dropdown-item">
//                 <FaUser /> Profile
//             </Link>
//             <Link to="/change-password" className="dropdown-item">
//                <FaLock /> Change Password
//             </Link>
//             <Link to="/settings" className="dropdown-item">
//             <FaCog />  Settings
//             </Link>
//             <button className="dropdown-item logout" onClick={handleLogout}>
//               <FaSignOutAlt />  Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Navbar;

import { formatDate } from "../../utils/helpers";
import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { FaCog, FaUser, FaLock, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate("/"); // redirect to login
  };

  return (
    <header className="navbar">
      <h1 className="navbar-title">Admin Dashboard</h1>
      <div className="navbar-date">{formatDate(new Date())}</div>

      <div className="navbar-user" ref={dropdownRef}>
        <button className="user-button" onClick={() => setOpen((prev) => !prev)}>
          👤 {user?.name || "Admin"} ({role || "No role"}) ▾
        </button>

        {open && (
          <div className="dropdown">
            <Link to="/profile" className="dropdown-item">
              <FaUser className="dropdown-icon" /> Profile
            </Link>
            <Link to="/change-password" className="dropdown-item">
              <FaLock className="dropdown-icon" /> Change Password
            </Link>
            <Link to="/settings" className="dropdown-item">
              <FaCog className="dropdown-icon" /> Settings
            </Link>
            <button className="dropdown-item logout" onClick={handleLogout}>
              <FaSignOutAlt className="dropdown-icon" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
