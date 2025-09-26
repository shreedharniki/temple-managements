
const db = require("../config/db");

// ================= Find admin by email =================
const findAdminByEmail = (email, callback) => {
  const sql = "SELECT * FROM admin WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// ================= Find admin by phone =================
const findAdminByPhone = (phone, callback) => {
  const sql = "SELECT * FROM admin WHERE phone = ?";
  db.query(sql, [phone], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// ================= Update password by email =================
const updateAdminPasswordByEmail = (email, hashedPassword, callback) => {
  const sql = "UPDATE admin SET password = ? WHERE email = ?";
  db.query(sql, [hashedPassword, email], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// ================= Update password by phone =================
const updateAdminPasswordByPhone = (phone, hashedPassword, callback) => {
  const sql = "UPDATE admin SET password = ? WHERE phone = ?";
  db.query(sql, [hashedPassword, phone], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const updateAdminPasswordById = (id, hashedPassword, callback) => {
  const sql = "UPDATE admin SET password = ? WHERE id = ?";
  db.query(sql, [hashedPassword, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};
module.exports = {
  findAdminByEmail,
  findAdminByPhone,
  updateAdminPasswordByEmail,
  updateAdminPasswordByPhone,
  updateAdminPasswordById, // ✅ new
};
