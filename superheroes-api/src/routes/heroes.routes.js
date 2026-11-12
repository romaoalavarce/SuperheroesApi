
const express = require("express");
const router = express.Router();

const heroesController = require("../controllers/heroes.controller");

router.get("/", heroesController.list);
router.post("/", heroesController.create);

router.get("/:id", heroesController.getById);

router.put("/:id", heroesController.update);
router.patch("/:id", heroesController.patch);

router.delete("/:id", heroesController.remove);

module.exports = router;
