const knex = require("../knexfile");
const db = require("knex")(knex.development);


async function createProduct(req, res) {
    try {
      const { uid, product_name, price } = req.body;
      const newProduct = await db('product').insert({
        uid,
        product_name,
        price,
      });
      res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  
  async function getAllProducts(req, res) {
    try {
      const products = await db('product').select('*');
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  
  async function getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await db('product').where({ id }).first();
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  
  async function updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { uid, product_name, price } = req.body;
      const updatedProduct = await db('product').where({ id }).update({
        uid,
        product_name,
        price,
        updated_at: knex.fn.now(), // Update the updated_at timestamp
      });
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  
  async function deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await db('product').where({ id }).del();
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  
  module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  };