import { Request, Response } from "express"
import { pool } from "../../config/db"
import { router } from "./users.route"
import { userService } from "./users.service"


//! User Post Req & Res
const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body

    try {
        const result = await userService.createUserLogic(name, email)
        // console.log(result.rows[0]);
        res.status(201).json({
            success: true,
            message: "Data inserted successfully"
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserLogic()
        res.status(201).json({
            success: true,
            message: "User retrieved successfully ",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}


export const userControllers = { createUser, getUser }
