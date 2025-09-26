const db = require("../config/db");
const transporter = require("../config/emailConfig");

// Fetch template by title
function getTemplate(title, callback) {
  db.query("SELECT * FROM message WHERE title = ?", [title], (err, results) => {
    if (err) return callback(err);
    if (!results.length) return callback(new Error("Template not found"));
    callback(null, results[0]);
  });
}

// Replace {{placeholders}} in template
function replacePlaceholders(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
}

// Send email
function sendEmail(to, subject, html, callback) {
  transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html }, callback);
}

module.exports = { getTemplate, replacePlaceholders, sendEmail };
