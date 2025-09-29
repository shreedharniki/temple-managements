import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
// import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { apiGet, apiDelete } from "../../utils/helpers"; 
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa"; // Icons

function DonationTablePage() {
  const navigate = useNavigate(); // ✅ added navigate

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/donations");
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

  const handleDelete = (item) => setDeleteDialog({ open: true, item });

  const confirmDelete = async () => {
    try {
      await apiDelete(`/donations/${deleteDialog.item.id}`);
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
    navigate(`/donation/edit/${item.id}`); // ✅ use navigate instead of Link + onClick
  };

  return (
    <div className="p-6">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">💰 Donations</h2>
        <Button className="add-btn">
          <Link to="/donation">➕ Add Donation</Link>
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
                onClick={() => handleEdit(row)} // ✅ directly call handleEdit
              >
                <FaEdit />
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(row)}>
              <FaTrash/>
              </Button>
            </>
          )}
        />
      )}

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
        title="Delete Donation"
        description={`Are you sure you want to delete donation #${deleteDialog.item?.id} (₹${deleteDialog.item?.amount})?`}
        actions={
          <>
            <Button onClick={() => setDeleteDialog({ open: false, item: null })}>
            
             <FaTimes />
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
             <FaTrash/>
            </Button>
          </>
        }
      />
    </div>
  );
}

export default DonationTablePage;
