import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const ProductSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        productID: {
            type: String,
            unique: true,
            default: uuidv4,
        },
        image: { type: String },
        category: { type: String, required: true },
        stock: {
            type: Number,
            required: true,
            default: 0, 
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model('Product', ProductSchema);
