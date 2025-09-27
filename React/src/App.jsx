import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TablePage from "./pages/TablePage";
import ChangePassword from "./pages/ChangePassword";
import FormPage from "./pages/FormPage"; // ⬅️ make sure this exists
import LoginPage from "./pages/Auth/LoginPage";
 import AdminPage from "./pages/admin/AdminPage";
 import AdminTablePage from "./pages/admin/AdminTablePage";
 import EditAdminPage from "./pages/admin/EditAdminPage";
 import DevoteesPage from "./pages/devotees/DevoteesPage";
 import DonationPage from "./pages/DonationPage";
 import DevoteesTablePage from "./pages/devotees/DevoteesTablePage"
 import SettingsPage from "./pages/Settingspage";
 import SevaPage from "./pages/SevaPage";
import SevaTablePage from "./pages/SevaTablePage";
 import TemplePage from "./pages/temple/TemplePage";
 import TempleTablePage from "./pages/temple/TempleTablePage";
 import EditTemplePage from "./pages/temple/EditTemplePage";
 import EditDevoteesPage from "./pages/devotees/EditDevoteesPage";

 import SevaBookingsPage from "./pages/sevabooking/SevaBookingPage"
 import SevaBookingTablePage from "./pages/sevabooking/SevaBookingTablePage";
 import EditSevaBookingPage from "./pages/sevabooking/EditSevaBookingPage";
 import DeityPage from "./pages/DeityPage"

import DeityTablePage from "./pages/DeityTablePage";


function App() {

  return (
    <Routes>
        {/* Public route */}
       <Route path="/" element={<LoginPage />} />
      <Route element={<Layout />}>
     
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/form" element={<FormPage />} /> {/* ⬅️ add this */}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/admin-table" element={<AdminTablePage/>}/>
        <Route path="/admin/edit/:id" element={<EditAdminPage/>} />
        <Route path="/devotee/edit/:id" element={<EditDevoteesPage/>} />
        <Route path="/devotees" element={<DevoteesPage />} />
       <Route path="/devotees-table" element={<DevoteesTablePage />} />
        <Route path="/donation" element={<DonationPage/>}/>
         <Route path="/settings" element={< SettingsPage/>}/>
          <Route path="/seva" element={<SevaPage/>}/>
          <Route path="/seva-table" element={<SevaTablePage/>}/>
           <Route path="/temple" element={<TemplePage/>}/>
           <Route path="/temple-table" element={<TempleTablePage/>}/>
              <Route path="/temples/edit/:id" element={<EditTemplePage />} />
            <Route path="/seva-bookings" element={<SevaBookingsPage/>}/>
             <Route path="/seva-bookings-table" element={<SevaBookingTablePage/>}/>
              <Route path="/seva-bookings/edit/:id" element={<EditSevaBookingPage/>}/>
           <Route path="/deity" element={<DeityPage/>}/>
           <Route path="/deity-table" element={<DeityTablePage/>}/>
      </Route>

      {/* Redirect root → dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;

