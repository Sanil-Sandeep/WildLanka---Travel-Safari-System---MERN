import mongoose from "mongoose";

const expensesSchema = mongoose.Schema(
    {
        eID:{
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        expense:{
            type: String,
            required: true,
        },
        cost:{
           type: Number,
           required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Expenses = mongoose.model('Expenses', expensesSchema);