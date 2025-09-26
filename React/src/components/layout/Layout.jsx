import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css"; // 👈 import CSS
import Sidebar from "./Sidebar";
import Footer from "./Footer";
export default function Layout() {
  return (
    <div className="layout">
      {/* Sidebar */}
      
      <Sidebar />
      {/* Main */}
      <div className="main">
        <Navbar />
        <main className="content">
          <Outlet />
         
        </main>
      
        <Footer />
      </div>
    </div>
  );
}
