# MindMap PDF Library Backend

This repository is a Node.js backend system designed for writers to share their books & also sharing ebooks . Allowing users to access a wide range of pdf content for education, motivation, entertainment e.t.c

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

  ## User Endpoints

  ### Signup
  - **Endpoint:** `POST /api/user/signup`
  - **Description:** Allows a user to sign up for the application.
  - **Request Body:** JSON object containing user information.
  - **Response:** 
    - Success: Status 200 with a message confirming successful signup.
    - Error: Status 400 for invalid input or existing user.
  
  ### Signin
  - **Endpoint:** `POST /api/user/signin`
  - **Description:** Allows a registered user to sign in.
  - **Request Body:** JSON object containing user credentials (e.g., email and password).
  - **Response:** 
    - Success: Status 200 with a JWT token for authentication.
    - Error: Status 401 for unauthorized access or invalid credentials.
  
  ### Admin Access
  - **Endpoint:** `GET /api/user/admin`
  - **Description:** Retrieves data for admin users.
  - **Middleware:** `verifyToken` function to ensure authentication.
  - **Response:** 
    - Success: Status 200 with a message welcoming the admin user.
    - Error: 
      - Status 403 if user is not authenticated.
      - Status 403 if user does not have admin role.


  # Book Endpoints

  ### GET /api/books/random-books/:category
  - Description: Retrieve random books by category.
  - Parameters: `category` (String) - The category of the books.
  
  ### GET /api/books/:id
  - Description: Retrieve a single book by ID.
  - Parameters: `id` (String) - The ID of the book.  
  
  ### GET /api/books/:category
  - Description: Retrieve books by category.
  - Parameters: `category` (String) - The category of the books.
  
  ### GET /api/books/user/:userId
  - Description: Retrieve all books by a specific user.
  - Parameters: `userId` (String) - The ID of the user.
  
  ### POST /api/books/:userId/add-book
  - Description: Add a new book for a specific user.
  - Parameters: `userId` (String) - The ID of the user.
  
  ### GET /api/books/:bookId/pdf
  - Description: Retrieve the PDF file of a specific book.
  - Parameters: `bookId` (String) - The ID of the book.
  
  ### GET /api/books/search
  - Description: Search for books.
  - Parameters: None.
  
  ### GET /api/books/
  - Description: Retrieve all books.
  - Parameters: None.
  
  ### PATCH /api/books/:bookId/update-book
  - Description: Update a specific book.
  - Parameters: `bookId` (String) - The ID of the book.
  
  ### DELETE /api/books/:id/delete
  - Description: Delete a specific book by ID.
  - Parameters: `id` (String) - The ID of the book.

  # File Upload Endpoints

  ## Upload File
  - **Method:** POST
  - **Endpoint:** /api/file/upload
  - **Description:** Uploads a file(pdf).
  - **Request Body:** FormData with a single field named 'file' containing the file to be uploaded.
  - **Response:** JSON object with information about the uploaded file.
  
  ## Upload Image
  - **Method:** POST
  - **Endpoint:** /api/image/upload
  - **Description:** Uploads an image.
  - **Request Body:** FormData with a single field named 'file' containing the image to be uploaded.
  - **Response:** JSON object with information about the uploaded image.

  ## Extras
  Fell free to contribute by sending a pull request... **Thank You!!**

  
