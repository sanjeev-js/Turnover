import { Controller, Middleware, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BAD_REQUEST, StatusCodes } from "http-status-codes";
import logger from "../config/logger";
import { serverErrorResponse } from "./errors";
import { DB } from "../database/db";
import { USERS } from "../database/tableNames";
import { generateOTP } from "../utils/generateOtp";
import { hashPassword } from "../utils/hashPassword";
import { sendEmail } from "../utils/mail";

const { UNPROCESSABLE_ENTITY, UNAUTHORIZED, NOT_FOUND, OK } = StatusCodes;

@Controller("api/signup")
export class SignupController {
    @Post("")
    @Middleware([
        body("email", "email is not valid!")
            .exists({ checkFalsy: true, checkNull: true })
            .isEmail(),
        body("password", "password is required to process").exists({
            checkFalsy: true,
            checkNull: true,
        }),
        body("name", "name is required to process").exists({
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

            const { name, email, password } = req.body;

            const user = await DB(USERS).where({ email });

            if (user.length) {
                return res.status(NOT_FOUND).json({
                    code: NOT_FOUND,
                    success: false,
                    message: `User with email ${email} already present. Please try to sign in`,
                });
            }


            const otp = generateOTP();

            const newUser = await DB(USERS).insert({ email, emailOtp: otp, password: hashPassword(password), name })

            sendEmail(email, 'Please verify your email', `Hey ${name},\n\nYour registration is completed successfully.\n\nYour email verification code is ${otp}\n\nThanks`, '')

            return res.status(OK).json({
                code: OK,
                success: true,
                message: "Registration is completed successfully, please verify your email.",
            });
        } catch (error) {
            logger.error(error);
            serverErrorResponse(res);
        }
    }

    @Post("verify-email-otp")
    @Middleware([
        body("email", "email is not valid!")
            .exists({ checkFalsy: true, checkNull: true })
            .isEmail(),
        body("otp", "otp is required to process").exists({
            checkFalsy: true,
            checkNull: true,
        }),
    ])

    private async verifyEmailOtp(req: any, res: any) {

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

            const { email, otp } = req.body;

            const user = await DB(USERS).where({ email })

            if (user.length === 0) {
                return res.status(NOT_FOUND).json({
                    code: NOT_FOUND,
                    success: false,
                    message: `User doesn't exist! Please try to sign up.`,
                });
            }

            const { emailOtp } = user[0]

            if (emailOtp === otp) {

                await DB(USERS).where({ email }).update({ isEmailVerified: true })

                return res.status(OK).json({
                    code: OK,
                    success: true,
                    message: 'Your email is verified.'
                })

            } else {
                return res.status(BAD_REQUEST).json({
                    code: BAD_REQUEST,
                    success: false,
                    message: 'Please send correct otp!'
                })
            }

        } catch (error) {
            logger.error(error);
            serverErrorResponse(res);
        }
    }
}