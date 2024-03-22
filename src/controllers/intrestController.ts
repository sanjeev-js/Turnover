import { Controller, Middleware, Put, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BAD_REQUEST, StatusCodes } from "http-status-codes";
import { compareHash } from "../utils/hashPassword";
import logger from "../config/logger";
import { serverErrorResponse } from "./errors";
import { JWT_EXPIRE, JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";
import { DB } from "../database/db";
import { CATEGORIES, USERINTRESTS, USERS } from "../database/tableNames";
import verifyToken from "../middlewares/verifyToken";
import { ISecureRequest } from "@overnightjs/jwt";

const { UNPROCESSABLE_ENTITY, UNAUTHORIZED, NOT_FOUND, OK } = StatusCodes;

@Controller("api/interest")
export class InterestController {

    @Get('')
    @Middleware(verifyToken)
    private async getInterest(req: ISecureRequest, res: Response) {
        const { pageNo, pageSize } = req.query;

        const interest = await DB(USERINTRESTS).where({ userId: req.payload.userId })

        const total = await DB(CATEGORIES).count('categoryId as totalRecords')

        const data = await DB(CATEGORIES).select(['categoryId', 'categoryName']).orderBy('categoryId').limit(+pageSize).offset((+pageNo - 1) * +pageSize)

        if (data.length === 0) {
            return res.send(NOT_FOUND).json({
                code: NOT_FOUND,
                success: false,
            })
        }

        let userIntrest = interest[0]?.categoryIds?.split(',') || [];

        data.map((item) => {
            userIntrest.includes(String(item.categoryId)) ? item.seleted = true : item.seleted = false;
            return item;
        })

        return res.status(OK).json({
            code: OK,
            success: true,
            interest,
            data,
            total: total[0].totalRecords
        })
    }

    @Put("")
    @Middleware([
        verifyToken,
        body("categoryId", "categoryId is required to process").exists({
            checkFalsy: true,
            checkNull: true,
        }),
    ])

    private async insertUpdateUserInterest(req: ISecureRequest, res: Response) {
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

            const { categoryId } = req.body;

            const category = await DB(CATEGORIES).where({ categoryId })

            if (category.length === 0) {
                return res.status(BAD_REQUEST).json({
                    code: BAD_REQUEST,
                    success: false,
                    message: 'invalid interest',
                })
            }

            const interests = await DB(USERINTRESTS).where({ userId: req.payload.userId })

            if (interests.length === 0) {
                await DB(USERINTRESTS).insert({ userId: req.payload.userId || 1, categoryIds: categoryId })
            } else {

                let userData = interests[0].categoryIds ? interests[0].categoryIds?.split(",") : [];

                if (!userData.includes(categoryId)) {

                    userData.push(categoryId)

                    await DB(USERINTRESTS).update({ userId: req.payload.userId, categoryIds: userData.join(',') })
                } else {

                    userData.splice(userData.indexOf(categoryId), 1);

                    await DB(USERINTRESTS).update({ userId: req.payload.userId, categoryIds: userData.length ? userData.join(',') : null })
                }
            }

            return res.status(OK).json({
                code: OK,
                success: true,
                message: 'interest updated succesfully!'
            })


        } catch (error) {
            logger.error(error);
            serverErrorResponse(res);
        }
    }
}