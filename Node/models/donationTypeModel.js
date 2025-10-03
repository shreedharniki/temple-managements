const db = require("../config/db");

const DonationTypeModel = {
  // Fetch all donation types
  getAll: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM donationtype", (err, results) =>
        err ? reject(err) : resolve(results)
      );
    }),

  // Fetch a single donation type by ID
  getById: (id) =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM donationtype WHERE id = ?", [id], (err, result) =>
        err ? reject(err) : resolve(result[0])
      );
    }),

  // Create a new donation type
  create: (data) =>
    new Promise((resolve, reject) => {
      const sql = "INSERT INTO donationtype (name, amount, temple_id) VALUES (?, ?, ?)";
      db.query(sql, [data.name, data.amount, data.temple_id], (err, result) =>
        err ? reject(err) : resolve(result)
      );
    }),

  // Update a donation type
  update: (id, data) =>
    new Promise((resolve, reject) => {
      const sql = "UPDATE donationtype SET name = ?, amount = ?, temple_id = ? WHERE id = ?";
      db.query(sql, [data.name, data.amount, data.temple_id, id], (err, result) =>
        err ? reject(err) : resolve(result)
      );
    }),

  // Delete a donation type
  delete: (id) =>
    new Promise((resolve, reject) => {
      db.query("DELETE FROM donationtype WHERE id = ?", [id], (err, result) =>
        err ? reject(err) : resolve(result)
      );
    }),
};

module.exports = DonationTypeModel;
