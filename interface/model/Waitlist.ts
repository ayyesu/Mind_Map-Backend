import {Document} from 'mongoose';

export interface IWaitlistEntry extends Document {
    email: string;
}
