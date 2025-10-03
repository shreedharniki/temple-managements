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

function DonationTypeTablePage() {
  const columns = [
    { field: "id", label: "ID" },
    { field: "name", label: "Donation Type Name" },
    { field: "amount", label: "Amount" },
    { field: "temple_id", label: "Temple ID" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [dialog, setDialog] = useState({ open: false, item: null });
  const navigate = useNavigate();

  // Fetch donation types
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/donationtype");
      setData(res.data || res);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to fetch donation types" });
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
      await apiDelete(`/donationtype/${dialog.item.id}`);
      setAlert({ type: "success", message: `✅ ${dialog.item.name} deleted!` });
      fetchData();
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to delete donation type" });
    } finally {
      setDialog({ open: false, item: null });
    }
  };

  const handleEdit = (item) => {
    navigate(`/donationtype/edit/${item.id}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}
      >
        <h2>💰 Manage Donation Types</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton icon={FaPlus} label="Add Donation Type" to="/donationtype" />
          <IconButton icon={FaList} label="Donation Types List" to="/donation-type-table" variant="secondary" />
        </div>
      </div>

      {/* Alerts */}
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Loader / Table */}
      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={data}
          renderRowActions={(row) => (
            <div style={{ display: "flex", gap: "6px" }}>
              <IconButton icon={FaEdit} variant="secondary" onClick={() => handleEdit(row)} />
              <IconButton icon={FaTrash} variant="destructive" onClick={() => handleDelete(row)} />
            </div>
          )}
        />
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ open: false, item: null })}
        title="Confirm Delete"
        description={`Are you sure you want to delete "${dialog.item?.name}"?`}
        actions={
          <>
            <Button onClick={() => setDialog({ open: false, item: null })}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </>
        }
      />
    </div>
  );
}

export default DonationTypeTablePage;
