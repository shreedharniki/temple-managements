import React, { useState, useEffect } from "react";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import Alert from "../components/ui/alert";
import Dialog from "../components/ui/Dialog";
import Loader from "../components/ui/Loader";
import { apiGet, apiDelete } from "../utils/helpers"; // ✅ centralized helpers

function SevaTablePage() {
  const columns = ["id", "name", "amount","token","special","seats","maxlimit"]; // adjust to your API fields
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [dialog, setDialog] = useState({ open: false, item: null });

  // ✅ Fetch all seva data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/seva");
      setData(res.data || res); // handle {data:[]} or []
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to fetch seva list" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (item) => {
    setDialog({ open: true, item });
  };

  const confirmDelete = async () => {
    try {
      await apiDelete(`/seva/${dialog.item.id}`);
      setAlert({ type: "success", message: `✅ ${dialog.item.name} deleted!` });
      fetchData(); // refresh list
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to delete seva" });
    } finally {
      setDialog({ open: false, item: null });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Seva List</h2>

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
                onClick={() => alert(`✏️ Edit ${row.name}`)}
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
        description={`Are you sure you want to delete "${dialog.item?.name}"?`}
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

export default SevaTablePage;
