import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const SafariEventSchema = mongoose.Schema(
    {
        eventName: {
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
        eventID: {
            type: String,
            unique: true,
            default: uuidv4,
        },
        image: { type: String },
        category: { type: String, required: true },
        quantityy: {
            type: Number,
            required: true,
            default: 0, 
        },
    },
    {
        timestamps: true,
    }
);

export const Event = mongoose.model('Events', SafariEventSchema);
