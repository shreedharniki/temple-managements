import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiPut, apiDelete } from "../../utils/helpers"; 
import { useNavigate, Link } from "react-router-dom";
import "./sevabooking.css";

function SevaBookingTablePage() {
  const navigate = useNavigate();

  const columns = [
    { field: "id", label: "ID" },
    { field: "temple_id", label: "Temple" },
    { field: "deity_name", label: "Deity" },
    { field: "seva_name", label: "Seva" },
    { field: "amount", label: "Amount" },
    { field: "status", label: "Status" },
    { field: "seva_date", label: "Seva Date" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Dialog states
  const [cancelDialog, setCancelDialog] = useState({ open: false, item: null });
  const [cancelRemark, setCancelRemark] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });

  // Fetch bookings
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/bookings");
      setData(res.data || res);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to fetch bookings" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => navigate(`/seva-bookings/edit/${item.id}`);

  // Cancel dialog
  const handleCancel = (item) => {
    setCancelDialog({ open: true, item });
    setCancelRemark("");
  };

  const confirmCancel = async () => {
    try {
      await apiPut(`/bookings/${cancelDialog.item.id}`, {
        status: "cancelled",
        remarks: cancelRemark,
      });
      setAlert({ type: "success", message: "✅ Booking cancelled" });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to cancel booking" });
      console.error(err);
    } finally {
      setCancelDialog({ open: false, item: null });
    }
  };

  // Delete dialog
  const handleDelete = (item) => {
    setDeleteDialog({ open: true, item });
  };

  const confirmDelete = async () => {
    try {
      await apiDelete(`/bookings/${deleteDialog.item.id}`);
      setAlert({ type: "success", message: "✅ Booking deleted" });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to delete booking" });
      console.error(err);
    } finally {
      setDeleteDialog({ open: false, item: null });
    }
  };

  return (
    <div className="p-6">
      <div className="header">
        <h2>📋 Seva Bookings</h2>
        <Button className="add-btn">
          <Link to="/seva-bookings">➕ Add Seva Booking</Link>
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
              <Button variant="secondary" className="mr-2" onClick={() => handleEdit(row)}>
                Edit
              </Button>
               {row.status !== "cancelled" && (
              <Button variant="warning" className="mr-2" onClick={() => handleCancel(row)}>
                Cancel
              </Button>
                )}
              <Button variant="destructive" onClick={() => handleDelete(row)}>
                Delete
              </Button>
            </>
          )}
        />
      )}

      {/* Cancel Dialog */}
      <Dialog
        open={cancelDialog.open}
        onClose={() => setCancelDialog({ open: false, item: null })}
        title="Cancel Booking"
        description={`Enter a remark for cancelling the booking for "${cancelDialog.item?.devotee_name}"`}
        actions={
          <>
            <Button onClick={() => setCancelDialog({ open: false, item: null })}>
              Close
            </Button>
            <Button variant="warning" onClick={confirmCancel}>
              Confirm Cancel
            </Button>
          </>
        }
      >
        <textarea
          className="w-full p-2 border rounded mt-2"
          placeholder="Enter cancellation remark"
          value={cancelRemark}
          onChange={(e) => setCancelRemark(e.target.value)}
        />
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
        title="Delete Booking"
        description={`Are you sure you want to delete the booking for "${deleteDialog.item?.devotee_name}"?`}
        actions={
          <>
            <Button onClick={() => setDeleteDialog({ open: false, item: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </>
        }
      />
    </div>
  );
}

export default SevaBookingTablePage;
