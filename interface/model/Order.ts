import {Schema, Document} from 'mongoose';
import {Book} from './Book';

export interface Order extends Document {
    userId: Schema.Types.ObjectId;
    books: Book[];
    totalAmount: number;
    paymentId: string;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
}
