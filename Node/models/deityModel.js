const db = require("../config/db");

const DeityModel = {
  getAll: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM deities", (err, results) =>
        err ? reject(err) : resolve(results)
      );
    }),

  getById: (id) =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM deities WHERE id = ?", [id], (err, results) =>
        err ? reject(err) : resolve(results)
      );
    }),

  create: (data) =>
    new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO deities (temple_id, name) VALUES (?, ?)",
        [data.temple_id, data.name],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    }),

  update: (id, data) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE deities SET temple_id = ?, name = ? WHERE id = ?",
        [data.temple_id, data.name, id],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    }),

  delete: (id) =>
    new Promise((resolve, reject) => {
      db.query("DELETE FROM deities WHERE id = ?", [id], (err, result) =>
        err ? reject(err) : resolve(result)
      );
    }),
};

module.exports = DeityModel;
