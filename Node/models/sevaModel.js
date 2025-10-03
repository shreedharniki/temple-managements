const db = require("../config/db");

const SevaModel = {
  getAll: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM seva", (err, results) =>
        err ? reject(err) : resolve(results)
      );
    }),

  getById: (id) =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM seva WHERE id = ?", [id], (err, results) =>
        err ? reject(err) : resolve(results[0])
      );
    }),

  create: (data) =>
    new Promise((resolve, reject) => {
      const sql = `INSERT INTO seva (name, description, amount, seats, maxlimit, temple_id)
                   VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [data.name, data.description || "", data.amount, data.seats, data.maxlimit, data.temple_id],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    }),

  update: (id, data) =>
    new Promise((resolve, reject) => {
      const sql = `UPDATE seva SET name = ?, description = ?, amount = ?, seats = ?, maxlimit = ?, temple_id = ?
                   WHERE id = ?`;
      db.query(
        sql,
        [data.name, data.description || "", data.amount, data.seats, data.maxlimit, data.temple_id, id],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    }),

  delete: (id) =>
    new Promise((resolve, reject) => {
      db.query("DELETE FROM seva WHERE id = ?", [id], (err, result) =>
        err ? reject(err) : resolve(result)
      );
    }),
};

module.exports = SevaModel;
