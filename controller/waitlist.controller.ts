// WaitlistController.ts
import {Request, Response} from 'express';
import Waitlist from '../model/Waitlist';
import {IWaitlistEntry} from '../interface/model/Waitlist';

export const joinWaitlist = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const {email} = req.body;

        // Check if the email is already in the waitlist
        const existingEntry: IWaitlistEntry | null = await Waitlist.findOne({
            email,
        });
        if (existingEntry) {
            res.status(400).json({
                message: 'Already Joined waitlist',
            });
            return;
        }

        // Create a new waitlist entry
        const newEntry: IWaitlistEntry = new Waitlist({email});
        await newEntry.save();

        res.status(201).json({message: 'Added to waitlist'});
    } catch (error) {
        console.error('Error adding to waitlist:', error);
        res.status(500).json({error: 'Failed to add to waitlist'});
    }
};
