const db = require("../config/db");

const SettingsModel = {
  createOrUpdate: (data, callback) => {
    const { temple_id, logo, color_theme, sidebar, navbar, map, phone, email, address, founded_year } = data;

    const sql = `
      INSERT INTO temple_settings 
      (temple_id, logo, color_theme, sidebar, navbar, map, phone, email, address, founded_year)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        logo=VALUES(logo),
        color_theme=VALUES(color_theme),
        sidebar=VALUES(sidebar),
        navbar=VALUES(navbar),
        map=VALUES(map),
        phone=VALUES(phone),
        email=VALUES(email),
        address=VALUES(address),
        founded_year=VALUES(founded_year)
    `;

    db.query(
      sql,
      [temple_id, logo, color_theme, sidebar, navbar, map, phone, email, address, founded_year],
      (err, result) => {
        if (err) return callback(err);
        callback(null, { temple_id, logo, color_theme, sidebar, navbar, map, phone, email, address, founded_year });
      }
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM temple_settings", (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  getByTempleId: (templeId, callback) => {
    db.query("SELECT * FROM temple_settings WHERE temple_id=?", [templeId], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0] || null);
    });
  },

  delete: (templeId, callback) => {
    db.query("DELETE FROM temple_settings WHERE temple_id=?", [templeId], (err, result) => {
      if (err) return callback(err);
      callback(null, { message: "Settings deleted" });
    });
  }
};

module.exports = SettingsModel;
