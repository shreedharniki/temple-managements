// models/sevaBookingModel.js
const db = require("../config/db");

const SevaBooking = {
  getAll: (callback) => {
    db.query("SELECT * FROM sevabookings", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM sevabookings WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO sevabookings SET ?", data, callback);
  },

  update: (id, data, callback) => {
    db.query("UPDATE sevabookings SET ? WHERE id = ?", [data, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM sevabookings WHERE id = ?", [id], callback);
  },




};

module.exports = SevaBooking;
