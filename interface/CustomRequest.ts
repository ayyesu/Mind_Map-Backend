import express, {Request, Response, Router} from 'express';

interface CustomRequest extends Request {
    user?: any;
}

// export default CustomRequest;
export default CustomRequest;
