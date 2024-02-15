import mongoose, {Schema, Document, Model} from 'mongoose';
import {Order} from '../interface/model/Order';

const orderSchema: Schema<Order> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    books: [
        {
            bookId: {
                type: Schema.Types.ObjectId,
                ref: 'Book',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const OrderModel: Model<Order> = mongoose.model<Order>('Order', orderSchema);

export default OrderModel;
