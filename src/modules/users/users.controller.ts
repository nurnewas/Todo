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


//! Get All Users Req Res
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


//! Get single Users Req Res
const getSingleUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await userService.getSingleUserLogic(req.params.id as string);


        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        } else {
            res.status(201).json({
                success: true,
                message: "User Fetched Successfully",
                data: result.rows[0]
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "res."
        })
    }
}
//! User Update Single Users
const updateSingleUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userService.updateSingleUser(name, email, req.params.id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        } else {
            res.status(201).json({
                success: true,
                message: "User Updated Successfully",
                data: result.rows[0]
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "res."
        })
    }
}

export const userControllers = { createUser, getUser, getSingleUser, updateSingleUser }
