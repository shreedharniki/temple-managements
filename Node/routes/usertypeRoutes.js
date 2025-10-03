const express = require("express");
const router = express.Router();
const UserTypeController = require("../controllers/usertypeController");

// CRUD routes
router.get("/", UserTypeController.getAllUserTypes);
router.get("/:id", UserTypeController.getUserTypeById);
router.post("/", UserTypeController.createUserType);
router.put("/:id", UserTypeController.updateUserType);
router.delete("/:id", UserTypeController.deleteUserType);

module.exports = router;
