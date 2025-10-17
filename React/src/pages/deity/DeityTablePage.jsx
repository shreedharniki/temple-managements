// import React, { useState, useEffect } from "react";
// import Table from "../../components/ui/Table";
// import Button from "../../components/ui/Button";
// import Alert from "../../components/ui/Alert";
// import Dialog from "../../components/ui/Dialog";
// import Loader from "../../components/ui/Loader";
// import { apiGet, apiDelete } from "../../utils/helpers";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash, FaPlus, FaList } from "react-icons/fa";
// import IconButton from "../../components/ui/IconButton";

// function DeityTablePage() {
//   const columns = [
//     { field: "id", label: "ID" },
//     { field: "name", label: "Deity Name" },
   
//   ];

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState(null);
//   const [dialog, setDialog] = useState({ open: false, item: null });
//   const navigate = useNavigate();

//   // Fetch seva data
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await apiGet("/deity");
//       setData(res.data || res);
//     } catch (err) {
//       setAlert({ type: "error", message: "❌ Failed to fetch seva list" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = (item) => {
//     setDialog({ open: true, item });
//   };

//   const confirmDelete = async () => {
//     try {
//       await apiDelete(`/deity/${dialog.item.id}`);
//       setAlert({ type: "success", message: `✅ ${dialog.item.name} deleted!` });
//       fetchData();
//     } catch (err) {
//       setAlert({ type: "error", message: "❌ Failed to delete seva" });
//     } finally {
//       setDialog({ open: false, item: null });
//     }
//   };

//   const handleEdit = (item) => {
//     navigate(`/deity/edit/${item.id}`);
//   };

//   return (
//     <div className="p-6">
//       {/* Header with Add + List buttons */}
//       <div
//         className="header"
//         style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}
//       >
//         <h2>🙏 Manage Deity</h2>
//         <div style={{ display: "flex", gap: "8px" }}>
//           <IconButton icon={FaPlus} label="Add Deity" to="/deity" />
//           <IconButton icon={FaList} label="Deity List" to="/deity-table" variant="secondary" />
//         </div>
//       </div>

//       {/* Alerts */}
//       {alert && (
//         <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
//       )}

//       {/* Loader / Table */}
//       {loading ? (
//         <Loader />
//       ) : (
//         <Table
//           columns={columns}
//           data={data}
//           renderRowActions={(row) => (
//             <div style={{ display: "flex", gap: "6px" }}>
//               <IconButton
//                 icon={FaEdit}
//                 variant="secondary"
//                 onClick={() => handleEdit(row)}
//               />
//               <IconButton
//                 icon={FaTrash}
//                 variant="destructive"
//                 onClick={() => handleDelete(row)}
//               />
//             </div>
//           )}
//         />
//       )}

//       {/* Delete confirmation dialog */}
//       <Dialog
//         open={dialog.open}
//         onClose={() => setDialog({ open: false, item: null })}
//         title="Confirm Delete"
//         description={`Are you sure you want to delete "${dialog.item?.name}"?`}
//         actions={
//           <>
//             <Button onClick={() => setDialog({ open: false, item: null })}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={confirmDelete}>
//               Delete
//             </Button>
//           </>
//         }
//       />
//     </div>
//   );
// }

// export default DeityTablePage;


import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiDelete } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaList } from "react-icons/fa";
import IconButton from "../../components/ui/IconButton";

function DeityTablePage() {
  const navigate = useNavigate();
  const temple_id = localStorage.getItem("temple_id"); // ✅ Get current temple_id

  const columns = [
    { field: "id", label: "ID" },
    { field: "name", label: "Deity Name" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [dialog, setDialog] = useState({ open: false, item: null });

  // ✅ Fetch deities for the current temple
  const fetchData = async () => {
    setLoading(true);
    try {
      let res;

      // Try backend filtering first
      try {
        res = await apiGet(`/deity?temple_id=${temple_id}`);
      } catch (err) {
        console.warn("Fallback to client-side filtering:", err);
        res = await apiGet("/deity");
      }

      const allDeities = res.data || res;

      // ✅ Filter by temple_id if backend doesn't support query param
      const filtered = allDeities.filter(
        (item) => String(item.temple_id) === String(temple_id)
      );

      setData(filtered);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to fetch deities" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (temple_id) fetchData();
  }, [temple_id]);

  const handleDelete = (item) => setDialog({ open: true, item });

  const confirmDelete = async () => {
    try {
      await apiDelete(`/deity/${dialog.item.id}`);
      setAlert({ type: "success", message: `✅ ${dialog.item.name} deleted!` });
      fetchData();
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to delete deity" });
    } finally {
      setDialog({ open: false, item: null });
    }
  };

  const handleEdit = (item) => navigate(`/deity/edit/${item.id}`);

  return (
    <div className="p-6">
      {/* Header with Add + List buttons */}
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}
      >
        <h2>🙏 Manage Deity</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton icon={FaPlus} label="Add Deity" to="/deity" />
          <IconButton icon={FaList} label="Deity List" to="/deity-table" variant="secondary" />
        </div>
      </div>

      {/* Alerts */}
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Loader / Table */}
      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={data}
          renderRowActions={(row) => (
            <div style={{ display: "flex", gap: "6px" }}>
              <IconButton icon={FaEdit} variant="secondary" onClick={() => handleEdit(row)} />
              <IconButton icon={FaTrash} variant="destructive" onClick={() => handleDelete(row)} />
            </div>
          )}
        />
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ open: false, item: null })}
        title="Confirm Delete"
        description={`Are you sure you want to delete "${dialog.item?.name}"?`}
        actions={
          <>
            <Button onClick={() => setDialog({ open: false, item: null })}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </>
        }
      />
    </div>
  );
}

export default DeityTablePage;

