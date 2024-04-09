//oderItem


//oder
import mongoose, { Schema } from "mongoose";




const OrderItemSChema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },




});






const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    items: [OrderItemSChema],
    orderNumber: {
        type: String,

        unique: true,
        auto: true

    },
    customeInfor: {
        type: {
            name: {
                type: String,
                required: true
            },
            phone: {
                type: Number

            },
            email: {
                type: String,
                required: true,
            },
            payment: {
                type: String,
            },
            city: {
                type: String
            },

        },
    },
    totalPrice: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        emun: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    },



},

    { timestamps: true, versionKey: false }
);

export default mongoose.model('Order', OrderSchema);













