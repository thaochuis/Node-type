import Oder from "../model/oder";
import { StatusCodes } from 'http-status-codes';

export const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, customeInfor } = req.body;
        const order = await Oder.create({ userId, items, totalPrice, customeInfor });
        return res.status(StatusCodes.CREATED).json(order);

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })

    }







}

export const getOrder = async (req, res) => {
    try {
        const order = await Oder.find();
        if (order.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "No orders found" });

        }
        return res.status(StatusCodes.OK).json(order);


    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })

    }

}
export const getOderById = async (req, res) => {
    try {
        const { userId, orderId } = req.params;
        const order = await Oder.findOne({ userId, _id: orderId });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "order not found" });
        }
        return res.status(StatusCodes.OK).json(order);

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })



    }

}