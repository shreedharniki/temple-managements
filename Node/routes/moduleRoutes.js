// const express = require("express");
// const router = express.Router();
// const moduleController = require("../controllers/moduleController");

// router.get("/", moduleController.getAllModules);

// module.exports = router;



const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");

router.get("/", moduleController.getAllModules);
router.post("/", moduleController.createModule);
router.put("/:id", moduleController.updateModule);
router.delete("/:id", moduleController.deleteModule);

module.exports = router;
