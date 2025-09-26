// const db = require("../config/db");

// const Module = {
//   getAll: (callback) => {
//     db.query("SELECT * FROM modules", callback);
//   },
// };

// module.exports = Module;




const db = require("../config/db");

// Get all modules
exports.getAll = (callback) => {
  db.query("SELECT * FROM modules", callback);
};

// Create module
exports.create = (moduleData, callback) => {
  db.query("INSERT INTO modules SET ?", moduleData, callback);
};

// Update module
exports.update = (id, moduleData, callback) => {
  db.query("UPDATE modules SET ? WHERE id = ?", [moduleData, id], callback);
};

// Delete module
exports.delete = (id, callback) => {
  db.query("DELETE FROM modules WHERE id = ?", [id], callback);
};
