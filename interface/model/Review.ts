import {Document, Types} from 'mongoose';

export interface IReview extends Document {
    bookId: Types.ObjectId;
    userId: Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt: Date;
}
