import mongoose, {Schema} from 'mongoose';
import {IWaitlistEntry} from '../interface/model/Waitlist';

const WaitlistEntrySchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model<IWaitlistEntry>(
    'WaitlistEntry',
    WaitlistEntrySchema,
);
