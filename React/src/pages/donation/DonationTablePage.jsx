import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert"; // ✅ uncommented
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiDelete } from "../../utils/helpers"; 
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTimes, FaPlus, FaList } from "react-icons/fa";
import IconButton from "../../components/ui/IconButton";

function DonationTablePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const columns = [
    { field: "id", label: "ID" },
    { field: "amount", label: "Amount" },
    { field: "payment_method", label: "Payment Method" },
    { field: "remarks", label: "Remarks" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });

  // Fetch donations
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/donations", { headers: { Authorization: `Bearer ${token}` } });
      setData(res.data || res);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to fetch donations" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-dismiss alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleDelete = (item) => setDeleteDialog({ open: true, item });

  const confirmDelete = async () => {
    try {
      await apiDelete(`/donations/${deleteDialog.item.id}`, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Donation deleted" });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to delete donation" });
      console.error(err);
    } finally {
      setDeleteDialog({ open: false, item: null });
    }
  };

  const handleEdit = (item) => {
    navigate(`/donation/edit/${item.id}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2 >💰 Donations</h2>
        <div className="flex gap-2">
          <IconButton icon={FaPlus} label="Add Donation" to="/donation" />
          <IconButton icon={FaList} label="Donation List" to="/donation-table" variant="secondary" />
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {/* Table or Loader */}
      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={data}
          renderRowActions={(row) => (
            <div className="flex gap-2">
              <IconButton icon={FaEdit} variant="secondary" onClick={() => handleEdit(row)} />
              {role === "admin" && (
                <IconButton icon={FaTrash} variant="destructive" onClick={() => handleDelete(row)} />
              )}
            </div>
          )}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
        title="Delete Donation"
        description={`Are you sure you want to delete donation #${deleteDialog.item?.id} (₹${deleteDialog.item?.amount})?`}
        actions={
          <div className="flex gap-2">
            <Button onClick={() => setDeleteDialog({ open: false, item: null })}>
              <FaTimes /> Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <FaTrash /> Delete
            </Button>
          </div>
        }
      />
    </div>
  );
}

export default DonationTablePage;
