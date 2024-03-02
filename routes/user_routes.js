const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");

router.post("/add_product", productController.createProduct);
router.get("/get_all_products", productController.getAllProducts);
router.get("/get_product/:id", productController.getProductById);
router.put("/edit_product/:id", productController.updateProduct);
router.delete("/delete_product/:id", productController.deleteProduct);

module.exports = router;
