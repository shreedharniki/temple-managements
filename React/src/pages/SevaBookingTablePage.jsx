import React, { useState, useEffect } from "react";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import Dialog from "../components/ui/Dialog";
import Loader from "../components/ui/Loader";
import { apiGet, apiDelete } from "../utils/helpers"; // centralized axios helpers

function SevaBookingTablePage() {
  // ✅ define table columns (adjust if your API returns different fields)
  const columns = [
    "id",
    "nameof",
    "temple_id",
    "deity_id",
    "seva_id",
    "amount",
    "status",
    "paymentmode_id",
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [dialog, setDialog] = useState({ open: false, item: null });

  // ✅ Fetch all bookings
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/bookings"); // GET http://localhost:3001/api/bookings
      setData(res.data || res); // handle both {data:[]} or []
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to fetch bookings" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ delete handler
  const handleDelete = (item) => {
    setDialog({ open: true, item });
  };

  const confirmDelete = async () => {
    try {
      await apiDelete(`/bookings/${dialog.item.id}`);
      setAlert({ type: "success", message: `✅ Booking by ${dialog.item.nameof} deleted!` });
      fetchData(); // refresh list
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to delete booking" });
    } finally {
      setDialog({ open: false, item: null });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Seva Bookings</h2>

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
                onClick={() => alert(`✏️ Edit booking of ${row.nameof}`)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(row)}
              >
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
        description={`Are you sure you want to delete booking "${dialog.item?.nameof}"?`}
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

export default SevaBookingTablePage;
