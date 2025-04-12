import express from 'express';
import { Delivery } from '../models/deliveryModel.js';

const router = express.Router();

// Route to save a new delivery
router.post('/', async (request, response) => {
  try {
    const { Address, PostalCode, SenderName, ContactNumber } = request.body;

    // Check for required fields
    if (!Address || !PostalCode || !SenderName || !ContactNumber) {
      return response.status(400).send({
        message: 'All fields are required: Address, PostalCode, SenderName, ContactNumber',
      });
    }

    // Create new delivery
    const newDelivery = {
      Address,
      PostalCode,
      SenderName,
      ContactNumber,
    };

    const delivery = await Delivery.create(newDelivery);
    return response.status(201).send(delivery);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all orders
router.get('/', async (request, response) => {
  try {
    const deliverys = await Delivery.find({});
    return response.status(200).json({
      count: deliverys.length,
      data: deliverys,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get order by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return response.status(404).json({ message: 'Delivery not found' });
    }

    return response.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a delivery

router.put('/:id', async (request, response) => {
  try {
      if(
          
          !request.body.Address ||
          !request.body.PostalCode ||
          !request.body.SenderName ||
          !request.body.ContactNumber 

      ){
      return response.status(400).send({
          message: 'Send all required fields:  Address, PostalCode, SenderName, ContactNumber',
      });
      }

      const {id} = request.params;

      const result = await Delivery.findByIdAndUpdate(id, request.body);

      if (!result){
          return response.status(404).json({message: 'Delivery not found'});
      }

      return response.status(200).send({message: 'delivery updated successfully'});

  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
  }
});

// Route to delete a delivery
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedDelivery = await Delivery.findByIdAndDelete(id);

    if (!deletedDelivery) {
      return response.status(404).json({ message: 'Delivery not found' });
    }

    return response.status(200).send({
      message: 'Delivery deleted successfully',
      data: deletedDelivery,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
