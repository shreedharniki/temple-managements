// import { Routes, Route, Navigate } from "react-router-dom";
// import TablePage from "./pages/TablePage";
// import FormPage from "./pages/FormPage"; 

// function App() {

//   return (
//     <Routes>
//         {/* Public route */}

//         <Route element={<Layout />}>
//         <Route path="/table" element={<TablePage />} />
//         <Route path="/form" element={<FormPage />} /> {/* ⬅️ add this */}
//       </Route>

//       {/* Redirect root → dashboard */}
//       <Route path="*" element={<Navigate to="/dashboard" />} />
//     </Routes>
//   );
// }

// export default App;
import { Routes, Route, Navigate } from "react-router-dom";
// login
import LoginPage from "./pages/Auth/LoginPage";
// layout
import Layout from "./components/layout/Layout";
// dashboard
import Dashboard from "./pages/Dashboard";
// change password
import ChangePassword from "./pages/ChangePassword";
// setting
import SettingsPage from "./pages/settings/Settingspage";
// profile
import Profile from "./pages/Profile";
// admin
import AdminPage from "./pages/admin/AdminPage";
import AdminTablePage from "./pages/admin/AdminTablePage";
import EditAdminPage from "./pages/admin/EditAdminPage";

// devotees
import DevoteesPage from "./pages/devotees/DevoteesPage";
 import EditDevoteesPage from "./pages/devotees/EditDevoteesPage";
import DevoteesTablePage from "./pages/devotees/DevoteesTablePage";

// ProtectedRoute

import ProtectedRoute from "./components/layout/ProtectedRoute";


// temple
 import TemplePage from "./pages/temple/TemplePage";
 import TempleTablePage from "./pages/temple/TempleTablePage";
 import EditTemplePage from "./pages/temple/EditTemplePage";
import ViewTempleSettings from "./pages/temple/ViewTempleSettings";



// donation
 import DonationPage from "./pages/donation/DonationPage";
import DonationTablePage from "./pages/donation/DonationTablePage";
import EditDonationPage from "./pages/donation/EditDonationPage";

// donation type

import DonationTypeTablePage from "./pages/donation/DonationTypeTablePage";
import DonationTypePage from "./pages/donation/DonationTypePage";
import EditDonationTypePage from "./pages/donation/EditDonationTypePage";
// detiy
import DeityTablePage from "./pages/deity/DeityTablePage";
import DeityPage from "./pages/deity/DeityPage";
import EditDeityPage from "./pages/deity/EditDeityPage";
// SevaBookings
 import SevaBookingsPage from "./pages/sevabooking/SevaBookingPage"
 import SevaBookingTablePage from "./pages/sevabooking/SevaBookingTablePage";
 import EditSevaBookingPage from "./pages/sevabooking/EditSevaBookingPage";

// seva
import SevaPage from "./pages/seva/SevaPage";
import SevaTablePage from "./pages/seva/SevaTablePage";
import EditSevaPage from "./pages/seva/EditSevaPage";


function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Layout wrapper for authenticated pages */}
      <Route element={<Layout />}>
        {/* Everyone logged-in */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin + Super Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
         
          <Route path="/devotees" element={<DevoteesPage />} />
          <Route path="/devotee/edit/:id" element={<EditDevoteesPage/>} />
          <Route path="/devotees-table" element={<DevoteesTablePage />} />

            {/* donation */}
           <Route path="/donation" element={<DonationPage/>}/>
            <Route path="/donation-table" element={<DonationTablePage />} />
            <Route path="/donation/edit/:id"element={<EditDonationPage/>} />


            <Route path="/donation-type-table" element={<DonationTypeTablePage/>}/>
               <Route path="/donationtype" element={<DonationTypePage/>}/>
               <Route path="/donationtype/edit/:id" element={<EditDonationTypePage/>} />

            <Route path="/seva-bookings" element={<SevaBookingsPage/>}/>
            <Route path="/seva-bookings-table" element={<SevaBookingTablePage/>}/>
              <Route path="/seva-bookings/edit/:id" element={<EditSevaBookingPage/>}/>

            <Route path="/deity" element={<DeityPage/>}/>
            <Route path="/deity-table" element={<DeityTablePage/>}/>
            <Route path="deity/edit/:id" element={<EditDeityPage/>} />

             <Route path="/seva" element={<SevaPage/>}/>
           <Route path="/seva-table" element={<SevaTablePage/>}/>
           <Route path="/seva/edit/:id" element={<EditSevaPage/>}/>



        </Route>
        {/* Super Admin and admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin','super_admin']} />}>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={< SettingsPage/>}/>
        </Route>
        {/* Super Admin only */}
        <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
        
            <Route path="/temple" element={<TemplePage/>}/>
            <Route path="/temple-table" element={<TempleTablePage/>}/>
            <Route path="/temples/edit/:id" element={<EditTemplePage />} />
            <Route path="/temples/:templeId/settings" element={<ViewTempleSettings />} />


            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin-table" element={<AdminTablePage />} />
            <Route path="/admin/edit/:id" element={<EditAdminPage />} />


           
        </Route>
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
