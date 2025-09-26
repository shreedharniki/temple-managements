const db = require("../config/db");
const bcrypt = require("bcryptjs");

const AdminModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT a.id, a.name, a.phone, a.email, a.temple_id, t.name AS temple_name
        FROM admin a
        LEFT JOIN temples t ON a.temple_id = t.id
        ORDER BY a.id DESC
      `;
      db.query(sql, (err, results) => (err ? reject(err) : resolve(results)));
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT a.id, a.name, a.phone, a.email, a.temple_id, t.name AS temple_name
        FROM admin a
        LEFT JOIN temples t ON a.temple_id = t.id
        WHERE a.id = ?
      `;
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] || null);
      });
    });
  },
  create: (data) => {
    return new Promise((resolve, reject) => {
      const hashed = bcrypt.hashSync(data.password, 10);
      const sql = `
        INSERT INTO admin (name, phone, email, password, temple_id, role) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(sql, [data.name, data.phone, data.email, hashed, data.temple_id, data.role], 
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE admin SET name = ?, phone = ?, email = ?, temple_id = ? WHERE id = ?";
      let params = [data.name, data.phone, data.email, data.temple_id, id];

      if (data.password) {
        const hashed = bcrypt.hashSync(data.password, 10);
        sql = "UPDATE admin SET name = ?, phone = ?, email = ?, password = ?, temple_id = ? WHERE id = ?";
        params = [data.name, data.phone, data.email, hashed, data.temple_id, id];
      }

      db.query(sql, params, (err, result) => (err ? reject(err) : resolve(result)));
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM admin WHERE id = ?", [id], (err, result) => (err ? reject(err) : resolve(result)));
    });
  },
};

module.exports = AdminModel;
