
import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiDelete } from "../../utils/helpers";
// import { useNavigate,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTimes, FaPlus, FaList,FaEye } from "react-icons/fa";
import IconButton from "../../components/ui/IconButton";

function AdminTablePage() {
 const columns = [
    { field: "id", label: "ID" },
    { field: "name", label: "Temple Name" },
    { field: "phone", label: "Phone Number" },
    { field: "email", label: "Email" },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  
  // Fetch all temples
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data || res);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to fetch temples" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open delete dialog
  const handleDelete = (item) => {
    setDeleteDialog({ open: true, item });
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await apiDelete(`/admin/${deleteDialog.item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: `✅ ${deleteDialog.item.name} deleted!` });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to delete temple" });
    } finally {
      setDeleteDialog({ open: false, item: null });
    }
  };

  // Navigate to edit page
  const handleEdit = (item) => {
    navigate(`/admin/edit/${item.id}`);
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4">📋 Admins List</h2> */}
     {/* <div className="header">
        <h2>🏛️  Add Temple Admin </h2>
        <Button className="add-btn">
          <Link to="/admin">📋 Add Temple Admin</Link>
        </Button>
      </div> */}

      <div className="header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <h2>🏛️ Add Temple Admin</h2>
              <div style={{ display: "flex", gap: "8px" }}>
                <IconButton icon={FaPlus} label="Add Admin" to="/admin" />
                <IconButton icon={FaList} label="Admin List" to="/admin-table" variant="secondary" />
              </div>
            </div>
      {/* {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )} */}
       {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={data}
          renderRowActions={(row) => (
            <>
             <div style={{ display: "flex", gap: "6px" }}>
              <IconButton icon={FaEdit}
                variant="secondary"
                className="mr-2"
                onClick={() => handleEdit(row)}
              />
               

              {role === "super_admin" && (
                <IconButton icon={FaTrash}
                  variant="destructive"
                  onClick={() => handleDelete(row)}
                />
                
              )}
              </div>
            </>
          )}
        />
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
        title="Confirm Delete"
        description={`Are you sure you want to delete "${deleteDialog.item?.name}"?`}
        actions={
          <>
            <Button onClick={() => setDeleteDialog({ open: false, item: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      />
    </div>
  );
}

export default AdminTablePage;
