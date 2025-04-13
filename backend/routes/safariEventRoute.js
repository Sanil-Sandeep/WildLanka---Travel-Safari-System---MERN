import express from 'express';
import multer from 'multer';
import path from 'path';
import { Event } from '../models/safariEventModel.js'; 

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
    const { eventName, description, price, category, quantityy } = req.body; // Include stock in body
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!eventName || !description || !price || !category || quantityy === undefined) {
      return res.status(400).json({ message: 'Please provide eventName, description, price, category, and quantityy' });
    }

    const newEvent = { eventName, description, price, image, category, quantityy };
    const eventt = await Event.create(newEvent);
    return res.status(201).json(eventt);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate eventId value' });
    }
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to purchase a event (reduce quantity)
router.post('/purchase/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Expecting the quantity to be reduced

    const eventt = await Event.findById(id);
    if (!eventt) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (eventt.quantityy < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity' });
    }

    eventt.quantityy -= quantity; // Reduce stock by quantity
    await eventt.save(); // Save the updated product

    return res.status(200).json(eventt);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to remove event from the cart (restore event)
router.post('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Expecting the quantity to be restored

    const eventt = await Event.findById(id);
    if (!eventt) {
      return res.status(404).json({ message: 'Event not found' });
    }

    eventt.quantityy += quantity; // Restore quantityy by quantity
    await eventt.save(); // Save the updated product

    return res.status(200).json(eventt);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// The rest of your routes remain unchanged
// Route to get all events (with optional category filtering)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Handle category filter
    const query = category ? { category } : {};
    const events = await Event.find(query);
    return res.status(200).json({ count: events.length, data: events });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eventt = await Event.findById(id);
    if (!eventt) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(200).json(eventt);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to update a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { eventName, description, price, category, quantityy } = req.body; 
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!eventName || !description || !price || !category || quantityy === undefined) {
      return res.status(400).json({ message: 'Please provide eventName, description, price, category, and quantityy' });
    }

    // Find the event and update it
    const updateData = { eventName, description, price, category, quantityy }; 
    if (image) updateData.image = image;

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(200).json(updatedEvent);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate eventId value' });
    }
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
