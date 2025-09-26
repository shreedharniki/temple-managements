const db = require("../config/db");

const SevaModel = {
  getAll: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM seva", (err, results) =>
        err ? reject(err) : resolve(results)
      );
    }),

  create: (data) =>
    new Promise((resolve, reject) => {
      const sql = `INSERT INTO seva 
        (name, description, amount, maxlimit, seats, calendar, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [data.name, data.description, data.amount, data.maxlimit, data.seats, data.calendar, data.is_active],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    }),

  update: (id, data) =>
    new Promise((resolve, reject) => {
      const sql = `UPDATE seva SET 
        name = ?, description = ?, amount = ?, maxlimit = ?, seats = ?, calendar = ?, is_active = ? 
        WHERE id = ?`;
      db.query(
        sql,
        [data.name, data.description, data.amount, data.maxlimit, data.seats, data.calendar, data.is_active, id],
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
