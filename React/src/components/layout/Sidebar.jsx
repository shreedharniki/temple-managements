
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";

function Sidebar() {
  const role = useSelector((state) => state.auth.role);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="logo" className="logo" />
        TMS ADMIN
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link">
          Dashboard
        </Link>

        {/* 🔽 Temple (only for super_admin) */}
        {role === "super_admin" && (
          <div>
            <button
              className="sidebar-link submenu-toggle"
              onClick={() => toggleSubMenu("temple")}
            >
              Temple {openSubMenu === "temple" ? "▴" : "▾"}
            </button>
            {openSubMenu === "temple" && (
              <div className="sidebar-submenu">
                {/* <Link to="/temple" className="sidebar-sublink">
                  Temple Form
                </Link> */}
                <Link to="/temple-table" className="sidebar-sublink">
                  Temple List
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 🔽 Admin (only for super_admin) */}
        {role === "super_admin" && (
          <div>
            <button
              className="sidebar-link submenu-toggle"
              onClick={() => toggleSubMenu("admin")}
            >
              Admin {openSubMenu === "admin" ? "▴" : "▾"}
            </button>
            {openSubMenu === "admin" && (
              <div className="sidebar-submenu">
                <Link to="/admin" className="sidebar-sublink">
                  Create Admin
                </Link>
                <Link to="/admin-table" className="sidebar-sublink">
                  Admin List
                </Link>
                <Link to="/admin/logs" className="sidebar-sublink">
                  Logs
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 🔽 Devotees */}
         {role === "admin" && (
        <div>
          <button
            className="sidebar-link submenu-toggle"
            onClick={() => toggleSubMenu("devotees")}
          >
            Devotees {openSubMenu === "devotees" ? "▴" : "▾"}
          </button>
          {openSubMenu === "devotees" && (
            <div className="sidebar-submenu">
              {/* <Link to="/devotees" className="sidebar-sublink">
                Devotees Form
              </Link> */}
              <Link to="/devotees-table" className="sidebar-sublink">
                Devotees List
              </Link>
            </div>
          )}
        </div>
 )}
       {/* Other single links */}
         {role === "admin" && (
        <Link to="/donation-table" className="sidebar-link">
          Donation
        </Link>
         )}
        {/* 🔽 Seva Bookings */}
         {role === "admin" && (
        <div>
          <button
            className="sidebar-link submenu-toggle"
            onClick={() => toggleSubMenu("sevaBookings")}
          >
            Seva Bookings {openSubMenu === "sevaBookings" ? "▴" : "▾"}
          </button>
          {openSubMenu === "sevaBookings" && (
            <div className="sidebar-submenu">
              {/* <Link to="/seva-bookings" className="sidebar-sublink">
                Seva Bookings Form
              </Link> */}
              <Link to="/seva-bookings-table" className="sidebar-sublink">
                Seva Bookings List
              </Link>
            </div>
          )}
        </div>
         )}
        {/* 🔽 Deity */}
              {role === "admin" && (
        <div>
          <button
            className="sidebar-link submenu-toggle"
            onClick={() => toggleSubMenu("deity")}
          >
            Deity {openSubMenu === "deity" ? "▴" : "▾"}
          </button>
          {openSubMenu === "deity" && (
            <div className="sidebar-submenu">
              <Link to="/deity" className="sidebar-sublink">
                Deity Form
              </Link>
              <Link to="/deity-table" className="sidebar-sublink">
                Deity Table
              </Link>
            </div>
          )}
        </div>
              )}
                {/* 🔽 Seva */}
      {role === "admin" && (
        <div>
          <button
            className="sidebar-link submenu-toggle"
            onClick={() => toggleSubMenu("seva")}
          >
            Seva {openSubMenu === "seva" ? "▴" : "▾"}
          </button>
          {openSubMenu === "seva" && (
            <div className="sidebar-submenu">
              
              <Link to="/seva-table" className="sidebar-sublink">
                Seva Table
              </Link>
            </div>
          )}
        </div>
      )}

       

          {role === "admin" && (
        <Link to="/donation-type-table" className="sidebar-link">
          Donation Type
        </Link>
         )}

         
          {role === "admin" && (
        <Link to="/user-type-table" className="sidebar-link">
       User Type
        </Link>
         )}
      </nav>
    </aside>
  );
}

export default Sidebar;

