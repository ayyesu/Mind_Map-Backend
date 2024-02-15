import mongoose, {Schema, Model} from 'mongoose';
import {IBook} from '../interface/model/Book';

const bookSchema: Schema<IBook> = new Schema<IBook>({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    author: {type: String},
    description: {type: String},
    category: {type: String, required: true},
    price: {type: String},
    imageUrl: {type: String},
    fileUrl: {type: String},
    imageName: {type: String},
    fileName: {type: String},
    createdAt: {type: Date, default: Date.now},
});

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;
