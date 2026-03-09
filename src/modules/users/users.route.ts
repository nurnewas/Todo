import express, { Request, Response } from "express";
import { userControllers } from "./users.controller";



export const router = express.Router()

//? app.user("/users") => userRoute
// route => controller => service 
//! User Post Route
router.post("/", userControllers.createUser)


//! User Get Route
router.get("/", userControllers.getUser)

//! User Get single Route
router.get("/:id", userControllers.getSingleUser)

//! User Update Single Users
router.put("/:id", userControllers.updateSingleUser)

//! Delete user from DB
router.delete("/:id", userControllers.deleteUser)

export const userRoutes = router;