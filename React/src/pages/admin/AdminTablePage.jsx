




import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiDelete } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

function AdminTablePage() {
  const columns = ["id", "name", "temple_id", "phone", "email"];
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
      <h2 className="text-2xl font-bold mb-4">📋 Admins List</h2>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={data}
          renderRowActions={(row) => (
            <>
              <Button
                variant="secondary"
                className="mr-2"
                onClick={() => handleEdit(row)}
              >
                Edit
              </Button>

              {role === "super_admin" && (
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </Button>
              )}
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
