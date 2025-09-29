import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiDelete } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTimes, FaPlus, FaList,FaEye } from "react-icons/fa";
import IconButton from "../../components/ui/IconButton";

function TempleTablePage() {
  const columns = [
    { field: "id", label: "ID" },
    { field: "name", label: "Temple Name" },
    { field: "location", label: "Location" },
    { field: "description", label: "Description" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/temples", { headers: { Authorization: `Bearer ${token}` } });
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

  const handleEdit = (item) => navigate(`/temples/edit/${item.id}`);
  const handleDelete = (item) => setDeleteDialog({ open: true, item });

  const confirmDelete = async () => {
    try {
      await apiDelete(`/temples/${deleteDialog.item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: `✅ Temple "${deleteDialog.item.name}" deleted!` });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to delete temple" });
    } finally {
      setDeleteDialog({ open: false, item: null });
    }
  };

  return (
    <div className="p-6">
      <div className="header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2>🏛️ Temple List</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton icon={FaPlus} label="Add Temple" to="/temple" />
          <IconButton icon={FaList} label="Temple List" to="/temple-table" variant="secondary" />
        </div>
      </div>

      {alert && <Alert type={alert.type} onClose={() => setAlert(null)}>{alert.message}</Alert>}

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={data}
          renderRowActions={(row) => (
            <div style={{ display: "flex", gap: "6px" }}>
              <IconButton icon={FaEdit} onClick={() => handleEdit(row)} variant="secondary" />
                <IconButton 
  icon={FaEye} 
  onClick={() => navigate(`/temples/${row.id}/settings`)} 
  variant="primary" 
/>
              {role === "super_admin" && <IconButton icon={FaTrash} onClick={() => handleDelete(row)} variant="destructive" />}
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
          <div style={{ display: "flex", gap: "6px" }}>
            <IconButton icon={FaTimes} onClick={() => setDeleteDialog({ open: false, item: null })} variant="secondary" />
            <IconButton icon={FaTrash} onClick={confirmDelete} variant="destructive" />
           
          </div>
        }
      />
    </div>
  );
}

export default TempleTablePage;
