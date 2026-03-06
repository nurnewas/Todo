import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./users.controller";



export const router = express.Router()

//? app.user("/users") => userRoute
// route => controller => service 
//! User Post Route
router.post("/", userControllers.createUser)


router.get("/", userControllers.getUser)

export const userRoutes = router;