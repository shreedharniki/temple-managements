const db = require("../config/db");

// Get all donations
exports.getAll = (callback) => {
  const query = `
    SELECT d.*, t.name AS temple_name 
    FROM donations d 
    LEFT JOIN temples t ON d.temple_id = t.id
  `;
  db.query(query, callback);
};

// Get donation by ID
exports.getById = (id, callback) => {
  const query = `
    SELECT d.*, t.name AS temple_name 
    FROM donations d 
    LEFT JOIN temples t ON d.temple_id = t.id 
    WHERE d.id = ?
  `;
  db.query(query, [id], callback);
};

// Create new donation
exports.create = (donationData, callback) => {
  const query = "INSERT INTO donations SET ?";
  db.query(query, donationData, callback);
};

// Update donation
exports.update = (id, donationData, callback) => {
  db.query("UPDATE donations SET ? WHERE id = ?", [donationData, id], callback);
};

// Delete donation
exports.delete = (id, callback) => {
  db.query("DELETE FROM donations WHERE id = ?", [id], callback);
};

// Get donations by temple_id
exports.getByTemple = (templeId, callback) => {
  const query = `
    SELECT d.*, 
           t.name AS temple_name, 
           u.first_name, u.last_name, u.email 
    FROM donations d
    LEFT JOIN temples t ON d.temple_id = t.id
    LEFT JOIN devotees u ON d.user_id = u.id
    WHERE d.temple_id = ?
    
  `;
  db.query(query, [templeId], callback);
};

// Get donations by temple_id and user_id
exports.getByTempleAndUser = (templeId, userId, callback) => {
  const query = `
    SELECT d.*, 
           t.name AS temple_name, 
           u.first_name, u.last_name, u.email 
    FROM donations d
    LEFT JOIN temples t ON d.temple_id = t.id
    LEFT JOIN devotees u ON d.user_id = u.id
    WHERE d.temple_id = ? AND d.user_id = ?
    
  `;
  db.query(query, [templeId, userId], callback);
};


// Get donations by user_id across all temples


// Get all donations by user_id across all temples
exports.getByUser = (userId, callback) => {
  const query = `
    SELECT d.*, 
           t.name AS temple_name, 
           u.first_name, u.last_name, u.email 
    FROM donations d
    LEFT JOIN temples t ON d.temple_id = t.id
    LEFT JOIN devotees u ON d.user_id = u.id
    WHERE d.user_id = ?
   
  `;
  db.query(query, [userId], callback);
};
