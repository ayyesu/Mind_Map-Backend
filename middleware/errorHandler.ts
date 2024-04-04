import {Request, Response, NextFunction} from 'express';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error('Error occurred:', err);

    // Check if the error is a known error type (e.g., ValidationError)
    // Handle specific error types accordingly
    if (err.name === 'ValidationError') {
        return res.status(400).json({message: err.message});
    }

    // If the error is not a known error type, return a generic error response
    return res.status(500).json({message: 'Internal Server Error, try again.'});
};

export default errorHandler;
