import express from 'express';
import { Expenses } from '../models/paymentExpensesModel.js';

const router = express.Router();

//Route for save a expense
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.eID ||
      !request.body.name ||
      !request.body.expense ||
      !request.body.cost 
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: eID, name, expense, cost",
      });
    }
    const newExpense = {
      eID: request.body.eID,
      name: request.body.name,
      expense: request.body.expense,
      cost: request.body.cost,
    };

    const expense = await Expenses.create(newExpense);

    return response.status(201).send(expense);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get all expenses from database
router.get("/", async (request, response) => {
  try {
    const expenses = await Expenses.find({});

    return response.status(200).json({
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one expesnse from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const expense = await Expenses.findById(id);

    return response.status(200).json(expense);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a expense
router.put("/:id", async (request, response) => {
  try {
    if (
        !request.body.eID ||
        !request.body.name ||
        !request.body.expense ||
        !request.body.cost 
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: eID, name, expense, cost",
      });
    }

    const { id } = request.params;

    const result = await Expenses.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Expense not found" });
    }
    return response
      .status(200)
      .send({ message: "Expense details updated successdully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for delete a expense
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Expenses.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Expense not found" });
    }
    return response
      .status(200)
      .send({ message: "Expense deleted successfully " });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
