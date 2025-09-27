import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiDelete } from "../../utils/helpers";
import { useNavigate, Link } from "react-router-dom";

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

  // Fetch temples
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/temples", {
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

  // Navigate to edit
  const handleEdit = (item) => navigate(`/temples/edit/${item.id}`);

  // Delete
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
      <div className="header">
        <h2>🏛️ Temple List</h2>
        <Button className="add-btn">
          <Link to="/temple">➕ Add Temple</Link>
        </Button>
      </div>

      {alert && <Alert type={alert.type} onClose={() => setAlert(null)}>{alert.message}</Alert>}

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns} // Show labels in table header
          data={data}
          renderRowActions={(row) => (
            <>
              <Button variant="secondary" className="mr-2" onClick={() => handleEdit(row)}>Edit</Button>
              {role === "super_admin" && (
                <Button variant="destructive" onClick={() => handleDelete(row)}>Delete</Button>
              )}
            </>
          )}
          fieldMapping={columns.map(c => c.field)} // optional: map labels to data keys
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
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </>
        }
      />
    </div>
  );
}

export default TempleTablePage;
