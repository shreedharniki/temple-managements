const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const templeRoutes = require("./routes/templeRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const templeModuleRoutes = require("./routes/templeModuleRoutes");
const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");
const donationRoutes = require("./routes/donationRoutes");
const devoteeRoutes = require("./routes/devoteeRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const deityRoutes = require("./routes/deityRoutes");
const sevaRoutes = require("./routes/sevaRoutes");
const sevaBookingRoutes = require("./routes/sevaBookingRoutes");

const donationTypeRoutes = require("./routes/donationTypeRoutes");

const usertypeRoutes = require("./routes/usertypeRoutes");
// app.use(cors());

app.use(cors(
  {
  origin: 'http://localhost:5173', // your frontend URLd
  credentials: true,

}
));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});
app.use("/api/temples", templeRoutes);

app.use("/api/modules", moduleRoutes);

app.use("/api/templeModules", templeModuleRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/devotees", devoteeRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/deity", deityRoutes);

app.use("/api/seva", sevaRoutes);
app.use("/api/bookings", sevaBookingRoutes);
app.use("/api/donationtype", donationTypeRoutes);

app.use("/api/usertype", usertypeRoutes);
app.get("/", (req, res) => res.json({ status: "ok" }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;
