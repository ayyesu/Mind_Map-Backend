import {initializeApp} from 'firebase/app';
import {getStorage, ref, deleteObject} from 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config();

// Define Firebase configuration interface
interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
}

// Initialize Firebase configuration
const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.FIREBASE_API || '',
    authDomain: process.env.FIREBASE_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || undefined,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage: any = getStorage(app);

export {ref, deleteObject, storage};
