
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const transporter = require("../config/emailConfig");
// const twilio = require("twilio");
// const {
//   findAdminByEmail,
//   findAdminByPhone,
//   updateAdminPasswordByEmail,
//   updateAdminPasswordByPhone,
//   updateAdminPasswordById,
// } = require("../models/loginModel");

// // OTP store (in-memory) — in production use Redis or DB
// const otpStore = {};

// // Twilio client
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// // ======================== LOGIN ========================
// const login = (req, res) => {
//   const { email, password } = req.body;

//   findAdminByEmail(email, (err, admin) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     if (!admin) return res.status(401).json({ message: "Invalid email or password" });

//     const isMatch = bcrypt.compareSync(password, admin.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     const token = jwt.sign(
//       {
//         adminId: admin.id,
//         email: admin.email,
//         temple_id: admin.temple_id,
//         role:admin.role,
       
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "Strict",
//         maxAge: 60 * 60 * 1000,
//       })
//       .json({
//         message: "Login successful",
//         token,
//         email: admin.email,
//         temple_id: admin.temple_id,
//         role:admin.role,
    
//       });
//   });
// };

// // ======================== FORGOT PASSWORD (SEND OTP) ========================
// const forgotPassword = async (req, res) => {
//   const { email, phone } = req.body;

//   if (!email && !phone) {
//     return res.status(400).json({ message: "Email or phone is required" });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000);

//   try {
//     if (email) {
//       findAdminByEmail(email, async (err, admin) => {
//         if (err) return res.status(500).json({ message: "Database error" });
//         if (!admin) return res.status(404).json({ message: "Email not found" });

//         otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: email,
//           subject: "Password Reset OTP",
//           text: `Hello ${admin.email},\n\nYour OTP is ${otp}. It expires in 5 minutes.`,
//         });

//         return res.json({ message: "OTP sent to your email" });
//       });
//     }

//     if (phone) {
//       findAdminByPhone(phone, async (err, admin) => {
//         if (err) return res.status(500).json({ message: "Database error" });
//         if (!admin) return res.status(404).json({ message: "Phone not found" });

//         otpStore[phone] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

//         // ✅ Normalize number to E.164 format
//         let formattedPhone = phone.replace(/\s+/g, "");
//         if (!formattedPhone.startsWith("+")) {
//           formattedPhone = `+91${formattedPhone}`; // assumes India
//         }

//         await twilioClient.messages.create({
//           body: `Hello ${admin.email}, your OTP is ${otp}. It expires in 5 minutes.`,
//           from: process.env.TWILIO_PHONE_NUMBER,
//           to: formattedPhone,
//         });

//         return res.json({ message: "OTP sent to your phone" });
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// // ======================== VERIFY OTP ========================
// const verifyOtp = (req, res) => {
//   const { email, phone, otp } = req.body;
//   const key = email || phone;

//   if (!key || !otp) return res.status(400).json({ message: "Email/Phone and OTP are required" });

//   const stored = otpStore[key];
//   if (!stored) return res.status(400).json({ message: "No OTP found" });

//   if (Date.now() > stored.expiresAt) {
//     delete otpStore[key];
//     return res.status(400).json({ message: "OTP expired" });
//   }

//   if (parseInt(otp) !== stored.otp) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }

//   res.json({ message: "OTP verified successfully" });
// };




// // ======================== RESET PASSWORD ========================
// const resetPassword = (req, res) => {
//   const { email, phone, otp, newPassword } = req.body;
//   const key = email || phone;

//   if (!key || !otp || !newPassword) {
//     return res.status(400).json({ message: "Email/Phone, OTP, and new password are required" });
//   }

//   const stored = otpStore[key];
//   if (!stored) return res.status(400).json({ message: "No OTP found" });

//   if (Date.now() > stored.expiresAt) {
//     delete otpStore[key];
//     return res.status(400).json({ message: "OTP expired" });
//   }

//   if (parseInt(otp) !== stored.otp) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }

//   const hashedPassword = bcrypt.hashSync(newPassword, 10);

//   if (email) {
//     updateAdminPasswordByEmail(email, hashedPassword, (err) => {
//       if (err) return res.status(500).json({ message: "Database error" });

//       delete otpStore[key];
//       res.json({ message: "Password reset successful" });
//     });
//   } else if (phone) {
//     updateAdminPasswordByPhone(phone, hashedPassword, (err) => {
//       if (err) return res.status(500).json({ message: "Database error" });

//       delete otpStore[key];
//       res.json({ message: "Password reset successful" });
//     });
//   }
// };


// // ======================== CHANGE PASSWORD ========================
// const changePassword = (req, res) => {
//   const { oldPassword, newPassword } = req.body;

//   if (!oldPassword || !newPassword) {
//     return res.status(400).json({ message: "Old and new password required" });
//   }

//   const { adminId, role, temple_id } = req.user; // from token

//   // ✅ First fetch user by ID
//   const sql = "SELECT * FROM admin WHERE id = ?";
//   db.query(sql, [adminId], (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     if (results.length === 0) return res.status(404).json({ message: "Admin not found" });

//     const admin = results[0];

//     // Check role + temple_id if needed
//     if (admin.temple_id !== temple_id || admin.role !== role) {
//       return res.status(403).json({ message: "Forbidden: Token mismatch" });
//     }

//     // ✅ Check old password
//     const isMatch = bcrypt.compareSync(oldPassword, admin.password);
//     if (!isMatch) return res.status(401).json({ message: "Old password incorrect" });

//     // ✅ Hash and update
//     const hashedPassword = bcrypt.hashSync(newPassword, 10);
//     updateAdminPasswordById(adminId, hashedPassword, (err) => {
//       if (err) return res.status(500).json({ message: "Database error" });

//       res.json({ message: "Password changed successfully" });
//     });
//   });
// };
// module.exports = {
//   login,
//   forgotPassword,
//   verifyOtp,
//   resetPassword,
//    changePassword, // ✅ new
// };



const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/emailConfig");
const twilio = require("twilio");
const db = require("../config/db");
const {
  findAdminByEmail,
  findAdminByPhone,
  updateAdminPasswordByEmail,
  updateAdminPasswordByPhone,
  updateAdminPasswordById,
} = require("../models/loginModel");

// In-memory OTP store (for demo purposes)
const otpStore = {};

// Twilio client
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// ======================== LOGIN ========================
const login = (req, res) => {
  const { email, password } = req.body;

  findAdminByEmail(email, (err, admin) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
        temple_id: admin.temple_id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        token,
        email: admin.email,
        temple_id: admin.temple_id,
        role: admin.role,
      });
  });
};

// ======================== FORGOT PASSWORD ========================
const forgotPassword = async (req, res) => {
  const { email, phone } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: "Email or phone is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    if (email) {
      findAdminByEmail(email, async (err, admin) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!admin) return res.status(404).json({ message: "Email not found" });

        otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Reset OTP",
          text: `Hello ${admin.email},\n\nYour OTP is ${otp}. It expires in 5 minutes.`,
        });

        return res.json({ message: "OTP sent to your email" });
      });
    }

    if (phone) {
      findAdminByPhone(phone, async (err, admin) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!admin) return res.status(404).json({ message: "Phone not found" });

        otpStore[phone] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

        let formattedPhone = phone.replace(/\s+/g, "");
        if (!formattedPhone.startsWith("+")) formattedPhone = `+91${formattedPhone}`;

        await twilioClient.messages.create({
          body: `Hello ${admin.email}, your OTP is ${otp}. It expires in 5 minutes.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone,
        });

        return res.json({ message: "OTP sent to your phone" });
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ======================== VERIFY OTP ========================
const verifyOtp = (req, res) => {
  const { email, phone, otp } = req.body;
  const key = email || phone;

  if (!key || !otp) return res.status(400).json({ message: "Email/Phone and OTP are required" });

  const stored = otpStore[key];
  if (!stored) return res.status(400).json({ message: "No OTP found" });

  if (Date.now() > stored.expiresAt) {
    delete otpStore[key];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (parseInt(otp) !== stored.otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  res.json({ message: "OTP verified successfully" });
};

// ======================== RESET PASSWORD ========================
const resetPassword = (req, res) => {
  const { email, phone, otp, newPassword } = req.body;
  const key = email || phone;

  if (!key || !otp || !newPassword) {
    return res.status(400).json({ message: "Email/Phone, OTP, and new password are required" });
  }

  const stored = otpStore[key];
  if (!stored) return res.status(400).json({ message: "No OTP found" });

  if (Date.now() > stored.expiresAt) {
    delete otpStore[key];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (parseInt(otp) !== stored.otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  if (email) {
    updateAdminPasswordByEmail(email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: "Database error" });

      delete otpStore[key];
      res.json({ message: "Password reset successful" });
    });
  } else if (phone) {
    updateAdminPasswordByPhone(phone, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: "Database error" });

      delete otpStore[key];
      res.json({ message: "Password reset successful" });
    });
  }
};

// ======================== CHANGE PASSWORD ========================
const changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { adminId, role, temple_id } = req.user; // from JWT

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Old and new password required" });
  }

  // Fetch admin by ID
  const sql = "SELECT * FROM admin WHERE id = ?";
  db.query(sql, [adminId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Admin not found" });

    const admin = results[0];

    // Validate token info
    if (admin.temple_id !== temple_id || admin.role !== role) {
      return res.status(403).json({ message: "Forbidden: Token mismatch" });
    }

    // Check old password
    const isMatch = bcrypt.compareSync(oldPassword, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Old password incorrect" });

    // Hash and update
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    updateAdminPasswordById(adminId, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ message: "Password changed successfully" });
    });
  });
};

module.exports = {
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
};
