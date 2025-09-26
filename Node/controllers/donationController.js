const Donation = require("../models/donationModel");

const db = require("../config/db");
const MessageService = require("../utils/messageService");
// GET /donations
exports.getAll = (req, res) => {
  Donation.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET /donations/:id
exports.getById = (req, res) => {
  Donation.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results || results.length === 0) return res.status(404).json({ error: "Donation not found" });
    res.json(results[0]);
  });
};

// POST /donations
// exports.create = (req, res) => {
//   Donation.create(req.body, (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ id: result.insertId, ...req.body });
//   });
// };

exports.create = (req, res) => {
  const donationData = req.body; // must include user_id and temple_id

  Donation.create(donationData, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const newDonation = { id: result.insertId, ...donationData };

    // Get devotee info
    db.query("SELECT * FROM devotees WHERE id = ?", [donationData.user_id], (err, devotees) => {
      if (err || !devotees.length) return res.status(201).json(newDonation);

      const devotee = devotees[0];

      // Get temple info
      db.query("SELECT name, location FROM temples WHERE id = ?", [donationData.temple_id], (err, temples) => {
        if (err || !temples.length) return res.status(201).json(newDonation);

        const temple = temples[0];

        // Get message template
        MessageService.getTemplate("Donation Received", (err, template) => {
          if (err || !template) return res.status(201).json(newDonation);

          const placeholders = {
            fullname: `${devotee.first_name} ${devotee.last_name}`,
            amount: donationData.amount,
            orgshort: temple.name,
            orgname: `${temple.name}, ${temple.location}`
          };

          const subject = MessageService.replacePlaceholders(template.email_subject, placeholders);
          const body = MessageService.replacePlaceholders(template.email_message, placeholders);

          MessageService.sendEmail(devotee.email, subject, body, (err) => {
            if (err) console.error("Error sending donation email:", err);
            else console.log("Donation email sent to:", devotee.email);

            // Respond after email attempt
            res.status(201).json(newDonation);
          });
        });
      });
    });
  });
};

// POST /donations


// PUT /donations/:id
exports.update = (req, res) => {
  Donation.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Donation updated" });
  });
};

// DELETE /donations/:id
exports.remove = (req, res) => {
  Donation.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Donation deleted" });
  });
};




// GET /donations/report/:temple_id
exports.getReportByTemple = (req, res) => {
  Donation.getByTemple(req.params.temple_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results.length) return res.status(404).json({ message: "No donations found for this temple" });
    res.json(results);
  });
};

// GET /donations/report/:temple_id/:user_id
exports.getReportByTempleAndUser = (req, res) => {
  const { temple_id, user_id } = req.params;

  Donation.getByTempleAndUser(temple_id, user_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results.length) return res.status(404).json({ message: "No donations found for this user in this temple" });
    res.json(results);
  });
};


exports.getReportByUser = (req, res) => {
  Donation.getByUser(req.params.user_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results.length) return res.status(404).json({ message: "No donations found for this user" });
    res.json(results);
  });
};
