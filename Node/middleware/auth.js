const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user; // attach user to request
    next();
  });
};

// Role-based authorization
exports.authorize = (roles = []) => {
 
  
  return (req, res, next) => {
    // console.log(req,"gfgfgfgf")
    //  console.log("hgf",roles);
    if (!roles.includes(req.user.role)) {

      return res.status(403).json({ message: "Forbidden: Not enough privileges" });
    }
    next();
  };
};
