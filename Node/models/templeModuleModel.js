// const db = require("../config/db");

// const TempleModule = {
//   // Get all module assignments for a temple, joined with module details
//   getByTempleId: (templeId, callback) => {
//     const sql = `
//       SELECT tm.module_id AS id, tm.is_enabled, m.name, m.category
//       FROM temple_modules tm
//       JOIN modules m ON tm.module_id = m.id
//       WHERE tm.temple_id = ?
//     `;
//     db.query(sql, [templeId], callback);
//   },

//   // Save (insert/update) module assignments for a temple
//   saveAssignments: (templeId, modules, callback) => {
//     const queries = modules.map((mod) => {
//       return new Promise((resolve, reject) => {
//         const { moduleId, is_enabled } = mod;

//         const sql = `
//           INSERT INTO temple_modules (temple_id, module_id, is_enabled)
//           VALUES (?, ?, ?)
//           ON DUPLICATE KEY UPDATE is_enabled = ?
//         `;

//         db.query(sql, [templeId, moduleId, is_enabled, is_enabled], (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         });
//       });
//     });

//     Promise.all(queries)
//       .then((results) => callback(null, results))
//       .catch((err) => callback(err));
//   }
// };

// module.exports = TempleModule;


const db = require("../config/db");

const TempleModule = {
  getByTempleId: (templeId, callback) => {
    const sql = `
      SELECT * FROM temple_modules
      WHERE temple_id = ?
    `;
    db.query(sql, [templeId], callback);
  }
};

module.exports = TempleModule;
