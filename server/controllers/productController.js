const Product = require("../models/productModel");

//create product

const createProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({
      title: req.body.title,
      description: req.body.description,
    });

    if (existingProduct) {
      return res.status(400).json({
        error: "Product already exists with the same title and description",
      });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create a product",
      details: error.message,
    });
  }
};

//update a prodyct
updateProducts = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({
        error: "product not found",
      });
    res.json({ message: "product updated", product });
  } catch (error) {
    res.status(500).json({ error: "error updating products" });
  }
};

//delete products

deleteProducts = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);
    if (!products) {
      res.status(404).json({
        error: "Product not found!",
      });
      res.json({
        message: "product deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "error in deleting products",
    });
  }
};

//get all Producfts
getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching products",
    });
  }
};

//get Sigle Product by Id

getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      res.status(404).json({
        error: "product not fouund",
      });
    res.json(product);
  } catch (error) {
    res.status(500).json({
      Error: "error in fetching product",
    });
  }
};
module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  deleteProducts,
  updateProducts,
};
