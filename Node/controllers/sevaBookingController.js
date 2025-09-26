 // controllers/sevaBookingController.js
const SevaBooking = require("../models/sevaBookingModel");

exports.getAllBookings = (req, res) => {
  SevaBooking.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getBookingById = (req, res) => {
  SevaBooking.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.createBooking = (req, res) => {
  SevaBooking.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Booking created", id: result.insertId });
  });
};

exports.updateBooking = (req, res) => {
  SevaBooking.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Booking updated" });
  });
};

exports.deleteBooking = (req, res) => {
  SevaBooking.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Booking deleted" });
  });
};





