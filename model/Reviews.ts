import mongoose, {Schema, Model} from 'mongoose';
import {IReview} from '../interface/model/Review';

const reviewSchema: Schema<IReview> = new Schema<IReview>({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review: Model<IReview> = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
