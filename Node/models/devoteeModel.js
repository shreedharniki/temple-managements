const db = require("../config/db");

// Get all devotees
exports.getAll = (callback) => {
  db.query("SELECT * FROM devotees", callback);
};

// Get devotee by ID
exports.getById = (id, callback) => {
  db.query("SELECT * FROM devotees WHERE id = ?", [id], callback);
};

// Create new devotee
exports.create = (data, callback) => {
  db.query("INSERT INTO devotees SET ?", data, callback);
};

// Update devotee
exports.update = (id, data, callback) => {
  db.query("UPDATE devotees SET ? WHERE id = ?", [data, id], callback);
};

// Delete devotee
exports.delete = (id, callback) => {
  db.query("DELETE FROM devotees WHERE id = ?", [id], callback);
};
