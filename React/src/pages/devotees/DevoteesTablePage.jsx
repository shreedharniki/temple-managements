import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";
import { useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaList } from "react-icons/fa";
import IconButton from "../../components/ui/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevotees, deleteDevotee, clearAlert } from "../../store/devoteesSlice";

function DevoteesTablePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error, success } = useSelector((state) => state.devotees);
  const [dialog, setDialog] = useState({ open: false, item: null });
    const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    dispatch(fetchDevotees());
  }, [dispatch]);

  const handleDelete = (item) => setDialog({ open: true, item });

  const confirmDelete = () => {
    dispatch(deleteDevotee(dialog.item.id));
    setDialog({ open: false, item: null });
  };

  const handleEdit = (item) => navigate(`/devotee/edit/${item.id}`);

  const columns = [
    { field: "id", label: "ID" },
    { field: "first_name", label: "First Name" },
    { field: "last_name", label: "Last Name" },
    { field: "email", label: "Email" },
    { field: "mobile", label: "Mobile" },
    { field: "city", label: "City" },
    { field: "state", label: "State" },
  ];

  return (
    <div className="p-6">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2 >🙏 Devotees</h2>
         <div style={{ display: "flex", gap: "8px" }}>
           <IconButton icon={FaPlus} label="Add Devotee" to="/devotees" />
                    <IconButton icon={FaList} label="Devotee List" to="/devotees-table" variant="secondary" />
         
         </div>
        
      </div>

      {error && <Alert type="error" onClose={() => dispatch(clearAlert())}>{error}</Alert>}
      {success && <Alert type="success" onClose={() => dispatch(clearAlert())}>{success}</Alert>}

      {loading ? <Loader /> : (
        <Table
          columns={columns}
          data={list}
          renderRowActions={(row) => (
            <>
            <div style={{ display: "flex", gap: "6px" }}>
              {/* <Button variant="secondary" onClick={() => handleEdit(row)}>Edit</Button> */}
                <IconButton icon={FaEdit} variant="secondary" onClick={() => handleEdit(row)} />
                   {role === "admin" && (
               
                <IconButton icon={FaTrash} variant="destructive" onClick={() => handleDelete(row)} />
              )}
              </div>
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
            <Button onClick={() => setDialog({ open: false, item: null })}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </>
        }
      />
    </div>
  );
}

export default DevoteesTablePage;
