const {storage} = require('../config/firebase.config');
const {ref, getDownloadURL, uploadBytes} = require('firebase/storage');
const {giveCurrentDateTime} = require('../util/dateTime');
const Books = require('../model/Books');

exports.addFile = async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(
            storage,
            `files/${req.file.originalname + '       ' + dateTime}`,
        );

        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage using uploadBytes
        const snapshot = await uploadBytes(
            storageRef,
            req.file.buffer,
            metadata,
        );

        // Grab the public url
        const downloadUrl = await getDownloadURL(snapshot.ref);

        // Extract the saved image name from the full path
        const savedFileName = snapshot.ref.name;

        return res.send({
            message: 'file uploaded to firebase storage',
            name: savedFileName,
            downloadURL: downloadUrl,
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

exports.addImage = async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(
            storage,
            `images/${req.file.originalname + '       ' + dateTime}`,
        );

        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage using uploadBytes
        const snapshot = await uploadBytes(
            storageRef,
            req.file.buffer,
            metadata,
        );

        // Grab the public url
        const downloadUrl = await getDownloadURL(snapshot.ref);

        // Extract the saved image name from the full path
        const savedImageName = snapshot.ref.name;

        return res.send({
            message: 'image uploaded to firebase storage',
            name: savedImageName,
            type: req.file.mimetype,
            downloadURL: downloadUrl,
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};
