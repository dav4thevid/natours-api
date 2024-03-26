const express = require("express");

const userRoutes = require("./../controllers/userController");

const router = express.Router();

router.route("/").get(userRoutes.getAllUsers).post(userRoutes.createAUser);

router.route("/:id").get(userRoutes.getAUser).patch(userRoutes.updateAUser).delete(userRoutes.deleteAUser);

module.exports = router;
