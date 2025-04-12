import mongoose from "mongoose";

const deliverySchema = mongoose.Schema(
    {
       
        Address:{
            type: String,
            required: true,
        },
        PostalCode: {
            type : Number,
            required : true,
        },
        SenderName:{
            type: String,
            required: true,
        },
        ContactNumber:{
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export const Delivery = mongoose.model('Delivery', deliverySchema);

