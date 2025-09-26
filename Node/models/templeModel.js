const db = require("../config/db");

exports.getAllTemples = (callback) => {
  db.query("SELECT * FROM temples", callback);
};

exports.getTempleById = (id, callback) => {
  db.query("SELECT * FROM temples WHERE id = ?", [id], callback);
};

exports.createTemple = (temple, callback) => {
  db.query("INSERT INTO temples SET ?", temple, callback);
};

exports.updateTemple = (id, temple, callback) => {
  db.query("UPDATE temples SET ? WHERE id = ?", [temple, id], callback);
};

exports.deleteTemple = (id, callback) => {
  db.query("DELETE FROM temples WHERE id = ?", [id], callback);
};

