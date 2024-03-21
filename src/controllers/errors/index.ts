import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const serverErrorResponse = (res: Response) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong!',
        success: false
    });
};