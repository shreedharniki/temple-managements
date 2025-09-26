// pages/TablePage.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/ui/Table";
import  Button  from "../components/ui/Button";
import  Pagination  from "../components/ui/Pagination";
import  Alert  from "../components/ui/alert";
import  Dialog  from "../components/ui/Dialog";
import Loader  from "../components/ui/Loader";

// mock API simulation
const mockApi = {
  fetchData: (page = 1, limit = 10) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const total = 20;
        const data = Array.from({ length: limit }, (_, i) => {
          const id = (page - 1) * limit + i + 1;
          return { id, name: `Item ${id}`, description: `Description ${id}` };
        }).filter((item) => item.id <= total);
        resolve({ data, total });
      }, 600);
    }),
};

function TablePage() {
  const columns = ["id", "name", "description"];
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [dialog, setDialog] = useState({ open: false, item: null });

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const res = await mockApi.fetchData(page);
      setData(res.data);
      setTotal(res.total);
    } catch {
      setAlert({ type: "error", message: "❌ Failed to fetch data" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleDelete = (item) => {
    setDialog({ open: true, item });
  };

  const confirmDelete = () => {
    setAlert({ type: "success", message: `✅ ${dialog.item.name} deleted!` });
    setDialog({ open: false, item: null });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Table Page</h2>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
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

          <Pagination
            current={page}
            total={total}
            pageSize={5}
            onChange={setPage}
          />
        </>
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

export default TablePage;
