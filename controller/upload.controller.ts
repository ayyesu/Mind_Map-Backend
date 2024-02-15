import {storage} from '../config/firebase.config';
import {ref, getDownloadURL, uploadBytes, UploadResult} from 'firebase/storage';
import {giveCurrentDateTime} from '../util/dateTime';
import {Request, Response} from 'express';

export const addFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(
            storage,
            `files/${req.file?.originalname + '       ' + dateTime}`,
        );

        const metadata = {
            contentType: req.file?.mimetype,
        };

        // Upload the file in the bucket storage using uploadBytes
        const snapshot: UploadResult = await uploadBytes(
            storageRef,
            req.file?.buffer as ArrayBuffer,
            metadata,
        );

        // Grab the public url
        const downloadUrl: string = await getDownloadURL(snapshot.ref);

        // Extract the saved file name from the full path
        const savedFileName: string = snapshot.ref.name;

        res.send({
            message: 'file uploaded to firebase storage',
            name: savedFileName,
            downloadURL: downloadUrl,
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export const addImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(
            storage,
            `images/${req.file?.originalname + '       ' + dateTime}`,
        );

        const metadata = {
            contentType: req.file?.mimetype,
        };

        // Upload the file in the bucket storage using uploadBytes
        const snapshot: UploadResult = await uploadBytes(
            storageRef,
            req.file?.buffer as ArrayBuffer,
            metadata,
        );

        // Grab the public url
        const downloadUrl: string = await getDownloadURL(snapshot.ref);

        // Extract the saved image name from the full path
        const savedImageName: string = snapshot.ref.name;

        res.send({
            message: 'image uploaded to firebase storage',
            name: savedImageName,
            type: req.file?.mimetype,
            downloadURL: downloadUrl,
        });
    } catch (error: Error | any) {
        res.status(400).send(error?.message);
    }
};
