const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.get("/", verifyToken,  userController.getUser);
router.get("/users", verifyToken, verifyIsAdmin, userController.getUsers);
router.put("/", verifyToken, userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/wishlist", verifyToken, userController.updateUserWishlist);

module.exports = router;