import mongoose, {Schema, Document} from 'mongoose';

export interface IBook extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    author?: string;
    description?: string;
    category: string;
    price?: string;
    imageUrl?: string;
    fileUrl?: string;
    imageName?: string;
    fileName?: string;
    createdAt: Date;
}

export interface Book {
    bookId: Schema.Types.ObjectId;
    quantity: number;
}
