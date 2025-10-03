const db = require("../config/db");

const UserTypeModel = {
  // Get all user roles
  getAll: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM usertype", (err, results) =>
        err ? reject(err) : resolve(results)
      );
    }),

  // Get single user role by ID
  getById: (id) =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM usertype WHERE id = ?", [id], (err, results) =>
        err ? reject(err) : resolve(results[0])
      );
    }),

  // Create a new user role
  create: (data) =>
    new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO usertype (name, description, temple_id) VALUES (?, ?, ?)",
        [data.name, data.description || "", data.temple_id || null],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    }),

  // Update existing user role
  update: (id, data) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE usertype SET name = ?, description = ?, temple_id = ? WHERE id = ?",
        [data.name, data.description || "", data.temple_id || null, id],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    }),

  // Delete a user role
  delete: (id) =>
    new Promise((resolve, reject) => {
      db.query("DELETE FROM usertype WHERE id = ?", [id], (err, result) =>
        err ? reject(err) : resolve(result)
      );
    }),
};

module.exports = UserTypeModel;
