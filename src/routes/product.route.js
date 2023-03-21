const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const productController = require('../controllers/product.controller');

router.get("/products", productController.getProducts);
router.post("/", verifyToken, verifyIsAdmin, productController.createProduct);

module.exports = router;