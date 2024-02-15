import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from '../interface/model/Users';

const userSchema: Schema<IUser> = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user',
    },
    books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
