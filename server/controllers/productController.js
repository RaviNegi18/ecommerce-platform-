import Product from "../models/productModel.js";

// Create product
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

// Update a product
const updateProducts = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product
const deleteProducts = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found!",
      });
    }

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error in deleting product",
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching products",
    });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: "Error in fetching product",
    });
  }
};

export {
  createProduct,
  updateProducts,
  deleteProducts,
  getAllProducts,
  getProductById,
};
