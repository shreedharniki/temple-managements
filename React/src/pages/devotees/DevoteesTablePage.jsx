import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiDelete } from "../../utils/helpers"; // centralized axios helpers
import { useNavigate, Link } from "react-router-dom";

function DevoteesTablePage() {
  // ✅ use objects instead of raw strings
  const columns = [
    { field: "id", label: "ID" },
    { field: "first_name", label: "First Name" },
    { field: "last_name", label: "Last Name" },
    { field: "email", label: "Email" },
    { field: "mobile", label: "Mobile" },
    { field: "city", label: "City" },
    { field: "state", label: "State" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [dialog, setDialog] = useState({ open: false, item: null });
  const navigate = useNavigate();

  // Fetch devotees
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/devotees"); // GET http://localhost:3001/api/devotees
      setData(res.data || res);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to fetch devotees" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = (item) => {
    setDialog({ open: true, item });
  };

  const confirmDelete = async () => {
    try {
      await apiDelete(`/devotees/${dialog.item.id}`);
      setAlert({
        type: "success",
        message: `✅ Devotee ${dialog.item.first_name} deleted!`,
      });
      setTimeout(() => navigate("/devotees"), 1000);
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to delete devotee" });
    } finally {
      setDialog({ open: false, item: null });
    }
  };

  // Navigate to edit page
  const handleEdit = (item) => {
    navigate(`/devotee/edit/${item.id}`);
  };

  return (
    <div className="p-6">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🙏 Devotees</h2>
        <Button className="add-btn">
          <Link to="/devotees">+ Add Devotee</Link>
        </Button>
      </div>

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
              <Button variant="destructive" onClick={() => handleDelete(row)}>
                Delete
              </Button>
            </>
          )}
        />
      )}

      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ open: false, item: null })}
        title="Confirm Delete"
        description={`Are you sure you want to delete devotee "${dialog.item?.first_name} ${dialog.item?.last_name}"?`}
        actions={
          <>
            <Button onClick={() => setDialog({ open: false, item: null })}>
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

export default DevoteesTablePage;
