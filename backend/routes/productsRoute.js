import express from 'express';
import multer from 'multer';
import path from 'path';
import { Product } from '../models/productModel.js'; 

const router = express.Router();

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Route to save a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { productName, description, price, category, stock } = req.body; // Include stock in body
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!productName || !description || !price || !category || stock === undefined) {
      return res.status(400).json({ message: 'Please provide productName, description, price, category, and stock' });
    }

    const newProduct = { productName, description, price, image, category, stock };
    const product = await Product.create(newProduct);
    return res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate productID value' });
    }
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to purchase a product (reduce stock)
router.post('/purchase/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Expecting the quantity to be reduced

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    product.stock -= quantity; // Reduce stock by quantity
    await product.save(); // Save the updated product

    return res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to remove product from the cart (restore stock)
router.post('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Expecting the quantity to be restored

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.stock += quantity; // Restore stock by quantity
    await product.save(); // Save the updated product

    return res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// The rest of your routes remain unchanged
// Route to get all products (with optional category filtering)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Handle category filter
    const query = category ? { category } : {};
    const products = await Product.find(query);
    return res.status(200).json({ count: products.length, data: products });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to update a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price, category, stock } = req.body; 
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!productName || !description || !price || !category || stock === undefined) {
      return res.status(400).json({ message: 'Please provide productName, description, price, category, and stock' });
    }

    // Find the product and update it
    const updateData = { productName, description, price, category, stock }; 
    if (image) updateData.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate productID value' });
    }
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
