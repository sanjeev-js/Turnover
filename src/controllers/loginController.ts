import { Controller, Middleware, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BAD_REQUEST, StatusCodes } from "http-status-codes";
import { compareHash } from "../utils/hashPassword";
import logger from "../config/logger";
import { serverErrorResponse } from "./errors";
import { JWT_EXPIRE, JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";
import { DB } from "../database/db";
import { USERS } from "../database/tableNames";

const { UNPROCESSABLE_ENTITY, UNAUTHORIZED, NOT_FOUND, OK } = StatusCodes;

@Controller("api/login")
export class LoginController {
    @Post("")
    @Middleware([
        body("email", "Email is not valid!")
            .exists({ checkFalsy: true, checkNull: true })
            .isEmail(),
        body("password", "Password is required to process").exists({
            checkFalsy: true,
            checkNull: true,
        }),
    ])

    private async login(req: Request, res: Response) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(UNPROCESSABLE_ENTITY).json({
                    success: false,
                    code: UNPROCESSABLE_ENTITY,
                    errors: errors.array(),
                    message: "Please check your inputs!",
                });
            }

            const { email, password } = req.body;

            const user = await DB(USERS).where({ email });

            if (user.length === 0) {
                return res.status(NOT_FOUND).json({
                    code: NOT_FOUND,
                    success: false,
                    message: "No user found with this email",
                });
            }


            if (!compareHash(password, user[0].password)) {
                return res.status(UNAUTHORIZED).json({
                    code: UNAUTHORIZED,
                    success: false,
                    message: "Email/Password does not match. Please retry.",
                });
            }

            if (!user[0].isEmailVerified) {
                return res.status(BAD_REQUEST).json({
                    code: UNAUTHORIZED,
                    success: false,
                    message: "Please verify your email.",
                });
            }

            const token = await jwt.sign({ email, userId: user[0].userId }, JWT_SECRET, {
                expiresIn: JWT_EXPIRE,
            });

            return res.status(OK).json({
                code: OK,
                success: true,
                message: "Login success!",
                data: { email: user[0].email },
                token,
            });
        } catch (error) {
            logger.error(error);
            serverErrorResponse(res);
        }
    }
}