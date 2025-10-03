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

function UserTypeTablePage() {
  const columns = [
    { field: "id", label: "ID" },
    { field: "name", label: "Role Name" },
    { field: "description", label: "Description" },
    { field: "temple_id", label: "Temple ID" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // Fetch all user roles
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/usertype", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data || res);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to fetch user roles" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open delete dialog
  const handleDelete = (item) => setDeleteDialog({ open: true, item });

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await apiDelete(`/usertype/${deleteDialog.item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: `✅ ${deleteDialog.item.name} deleted!` });
      fetchData();
    } catch {
      setAlert({ type: "error", message: "❌ Failed to delete role" });
    } finally {
      setDeleteDialog({ open: false, item: null });
    }
  };

  // Navigate to edit page
  const handleEdit = (item) => navigate(`/usertype/edit/${item.id}`);

  return (
    <div className="p-6">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2>👤 Manage User Roles</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton icon={FaPlus} label="Add Role" to="/usertype" />
          <IconButton icon={FaList} label="Role List" to="/user-type-table" variant="secondary" />
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={data}
          renderRowActions={(row) => (
            <div style={{ display: "flex", gap: "6px" }}>
              <IconButton icon={FaEdit} variant="secondary" onClick={() => handleEdit(row)} />
              {role === "admin" && (
                <IconButton icon={FaTrash} variant="destructive" onClick={() => handleDelete(row)} />
              )}
            </div>
          )}
        />
      )}

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
        title="Confirm Delete"
        description={`Are you sure you want to delete "${deleteDialog.item?.name}"?`}
        actions={
          <>
            <Button onClick={() => setDeleteDialog({ open: false, item: null })}>Cancel</Button>
             <Button variant="destructive" onClick={confirmDelete}>
                Delete
            </Button>
          </>
        }
      />
    </div>
  );
}

export default UserTypeTablePage;
