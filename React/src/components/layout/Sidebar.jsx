import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { 
  FaUsers, FaUser, FaMoneyBillWave, FaCalendarAlt, FaList, FaOm,
  FaTachometerAlt, FaPrayingHands, FaCoins, FaFortAwesome,
  FaAtom, FaListUl, FaPiggyBank, FaUserTie 
} from "react-icons/fa";

function Sidebar() {
  const role = useSelector((state) => state.auth.role);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const location = useLocation(); // ✅ current route

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <FaOm size={24} /> <span>TMS ADMIN</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className={`sidebar-link ${isActive("/dashboard") ? "active" : ""}`}>
          <FaTachometerAlt /> Dashboard
        </Link>

        {role === "super_admin" && (
          <div>
            <button
              className={`sidebar-link submenu-toggle ${openSubMenu === "temple" ? "active" : ""}`}
              onClick={() => toggleSubMenu("temple")}
            >
              <FaFortAwesome /> Temple {openSubMenu === "temple" ? "▴" : "▾"}
            </button>
            {openSubMenu === "temple" && (
              <div className="sidebar-submenu">
                <Link
                  to="/temple-table"
                  className={`sidebar-sublink ${isActive("/temple-table") ? "active" : ""}`}
                >
                  <FaListUl /> Temple List
                </Link>
              </div>
            )}
          </div>
        )}

        {role === "super_admin" && (
          <div>
            <button
              className={`sidebar-link submenu-toggle ${openSubMenu === "admin" ? "active" : ""}`}
              onClick={() => toggleSubMenu("admin")}
            >
              <FaAtom /> Admin {openSubMenu === "admin" ? "▴" : "▾"}
            </button>
            {openSubMenu === "admin" && (
              <div className="sidebar-submenu">
                <Link
                  to="/admin"
                  className={`sidebar-sublink ${isActive("/admin") ? "active" : ""}`}
                >
                  <FaListUl /> Create Admin
                </Link>
                <Link
                  to="/admin-table"
                  className={`sidebar-sublink ${isActive("/admin-table") ? "active" : ""}`}
                >
                  <FaListUl /> Admin List
                </Link>
              </div>
            )}
          </div>
        )}

        {role === "admin" && (
          <div>
            <button
              className={`sidebar-link submenu-toggle ${openSubMenu === "devotees" ? "active" : ""}`}
              onClick={() => toggleSubMenu("devotees")}
            >
              <FaUser /> Devotees {openSubMenu === "devotees" ? "▴" : "▾"}
            </button>
            {openSubMenu === "devotees" && (
              <div className="sidebar-submenu">
                <Link
                  to="/devotees-table"
                  className={`sidebar-sublink ${isActive("/devotees-table") ? "active" : ""}`}
                >
                  <FaUsers /> Devotees List
                </Link>
              </div>
            )}
          </div>
        )}

        {role === "admin" && (
          <Link
            to="/donation-table"
            className={`sidebar-link ${isActive("/donation-table") ? "active" : ""}`}
          >
            <FaMoneyBillWave /> Donation
          </Link>
        )}

        {role === "admin" && (
          <div>
            <button
              className={`sidebar-link submenu-toggle ${openSubMenu === "sevaBookings" ? "active" : ""}`}
              onClick={() => toggleSubMenu("sevaBookings")}
            >
              <FaCalendarAlt /> Seva Bookings {openSubMenu === "sevaBookings" ? "▴" : "▾"}
            </button>
            {openSubMenu === "sevaBookings" && (
              <div className="sidebar-submenu">
                <Link
                  to="/seva-bookings-table"
                  className={`sidebar-sublink ${isActive("/seva-bookings-table") ? "active" : ""}`}
                >
                  <FaList /> Seva Bookings List
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Deity */}
        {role === "admin" && (
          <div>
            <button
              className={`sidebar-link submenu-toggle ${openSubMenu === "deity" ? "active" : ""}`}
              onClick={() => toggleSubMenu("deity")}
            >
              <FaPrayingHands /> Deity {openSubMenu === "deity" ? "▴" : "▾"}
            </button>
            {openSubMenu === "deity" && (
              <div className="sidebar-submenu">
                <Link
                  to="/deity-table"
                  className={`sidebar-sublink ${isActive("/deity-table") ? "active" : ""}`}
                >
                  <FaListUl /> Deity Table
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Seva */}
        {role === "admin" && (
          <div>
            <button
              className={`sidebar-link submenu-toggle ${openSubMenu === "seva" ? "active" : ""}`}
              onClick={() => toggleSubMenu("seva")}
            >
              <FaCoins /> Seva {openSubMenu === "seva" ? "▴" : "▾"}
            </button>
            {openSubMenu === "seva" && (
              <div className="sidebar-submenu">
                <Link
                  to="/seva-table"
                  className={`sidebar-sublink ${isActive("/seva-table") ? "active" : ""}`}
                >
                  <FaListUl /> Seva Table
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Donation Type */}
        {role === "admin" && (
          <Link
            to="/donation-type-table"
            className={`sidebar-link ${isActive("/donation-type-table") ? "active" : ""}`}
          >
            <FaPiggyBank /> Donation Type
          </Link>
        )}

        {/* User Type */}
        {role === "admin" && (
          <Link
            to="/user-type-table"
            className={`sidebar-link ${isActive("/user-type-table") ? "active" : ""}`}
          >
            <FaUserTie /> User Type
          </Link>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
