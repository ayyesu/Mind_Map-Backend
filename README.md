# MindMap PDF Library Backend

MindMap is a Node.js backend library designed for writers to share their books & also sharing ebooks . Allowing users to access a wide range of pdf content for education, motivation, entertainment e.t.c

* npm init -y
* npm i typescript -D
* npx tsc --init
  
## install the packages needed
* npm i install

## Setting up the code base
- Create a `.env` and add the dependencies below:
  ```
  MONGO_URI = ................
  JWT_SECRET = ..............
  FIREBASE_API = ..............
  FIREbASE_DOMAIN = ..............
  FIREBASE_PROJECT_ID = ...........
  FIREBASE_STORAGE_BUCKET = ............
  FIREBASE_MESSAGING_SENDER_ID = ............
  FIREBASE_APP_ID = ..............
  FIREBASE_MEASUREMENT_ID = .........
  mail_app_password = ............
  ```
  
  ## Run the project
  - Run `npm run start` in the terminal

  ## Build
  - Run `npm run build`
    
  ```
  "scripts": {
    "dev": "nodemon ts-node-dev --files --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "watch": "tsc -w",
    "start": "npx nodemon",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ```
  
  ## Dependencies
  ```
  "dependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.21",
    "@types/firebase": "^3.2.1",
    "@types/joi": "^17.2.3",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/mongoose": "^5.11.97",
    "@types/multer": "^1.4.11",
    "@types/node-fetch": "^2.6.11",
    "@types/nodemailer": "^6.4.14",
    "@types/nodemon": "^1.19.6",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.4",
    "express": "^4.18.2",
    "firebase": "^10.8.0",
    "joi": "^17.12.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^7.6.8",
    "multer": "^1.4.5-lts.1",
    "node-fetch": "^3.3.2",
    "nodemailer": "^6.9.9",
    "nodemon": "^3.0.3"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
  ```
  
  ## Extras
  Fell free to contribute by sending a pull request... **Thank You!!**

  
