import React, { useState, useEffect } from "react";
// import EditForm from "../components/ui/EditForm";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/helpers";

function DeityTablePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [alert, setAlert] = useState(null);

  const fields = [
    { name: "temple_id", label: "Temple ID" },
    { name: "name", label: "Deity Name" },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/deity");
      setData(res);
    } catch {
      setAlert("Failed to fetch deities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchData(), []);

  const handleEdit = async (id) => {
    try {
      const res = await apiGet(`/deity/${id}`);
      setEditItem(res);
    } catch {
      setAlert("Failed to fetch deity");
    }
  };

  const handleUpdate = async (values) => {
    try {
      await apiPut(`/deity/${editItem.id}`, values);
      setAlert(`Updated ${values.name}`);
      setEditItem(null);
      fetchData();
    } catch {
      setAlert("Failed to update deity");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this deity?")) return;
    try {
      await apiDelete(`/deity/${id}`);
      setAlert("Deleted successfully");
      fetchData();
    } catch {
      setAlert("Failed to delete deity");
    }
  };

  return (
    <div>
      <h2>Deities</h2>
      {alert && <p>{alert}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Temple ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.temple_id}</td>
                <td>{d.name}</td>
                <td>
                  <button onClick={() => handleEdit(d.id)}>Edit</button>
                  <button onClick={() => handleDelete(d.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editItem && (
        <div>
          <h3>Edit Deity</h3>
          {/* <EditForm fields={fields} values={editItem} onSubmit={handleUpdate} />
          <button onClick={() => setEditItem(null)}>Cancel</button> */}
        </div>
      )}
    </div>
  );
}

export default DeityTablePage;
