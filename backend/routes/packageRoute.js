import express from 'express';
import multer from 'multer';
import path from 'path';
import { Package } from '../models/packageModel.js'; 

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

// Route to save a new package
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { packageName, description, price, category, quantityy } = req.body; // Include stock in body
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!packageName || !description || !price || !category || quantityy === undefined) {
      return res.status(400).json({ message: 'Please provide productName, description, price, category, and quantity' });
    }

    const newPackage = { packageName, description, price, image, category, quantityy };
    const packagee = await Package.create(newPackage);
    return res.status(201).json(packagee);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate packageID value' });
    }
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to purchase a package (reduce quantity)
router.post('/purchase/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Expecting the quantity to be reduced

    const packagee = await Package.findById(id);
    if (!packagee) {
      return res.status(404).json({ message: 'Package not found' });
    }

    if (packagee.quantityy < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    packagee.quantityy -= quantity; // Reduce stock by quantity
    await packagee.save(); // Save the updated product

    return res.status(200).json(packagee);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to remove package from the cart (restore stock)
router.post('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Expecting the quantity to be restored

    const packagee = await Package.findById(id);
    if (!packagee) {
      return res.status(404).json({ message: 'Package not found' });
    }

    packagee.quantityy += quantity; // Restore stock by quantity
    await packagee.save(); // Save the updated product

    return res.status(200).json(packagee);
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
    const packages = await Package.find(query);
    return res.status(200).json({ count: packages.length, data: packages });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to get a package by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const packagee = await Package.findById(id);
    if (!packagee) {
      return res.status(404).json({ message: 'Package not found' });
    }
    return res.status(200).json(packagee);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to update a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { packageName, description, price, category, quantityy } = req.body; 
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!packageName || !description || !price || !category || quantityy === undefined) {
      return res.status(400).json({ message: 'Please provide productName, description, price, category, and quantity' });
    }

    // Find the product and update it
    const updateData = { packageName, description, price, category, quantityy }; 
    if (image) updateData.image = image;

    const updatedPackage = await Package.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    return res.status(200).json(updatedPackage);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate packageId value' });
    }
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a package
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    return res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
