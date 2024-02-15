import mongoose, {Document} from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'superadmin';
    books: mongoose.Types.ObjectId[];
    createdAt: Date;
}
