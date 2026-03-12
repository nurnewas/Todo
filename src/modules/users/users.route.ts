import express, { Request, Response } from "express";
import { userControllers } from "./users.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";



export const router = express.Router()

//? app.user("/users") => userRoute
// route => controller => service 
//! User Post Route
router.post("/", userControllers.createUser)

//! User Get Route
router.get("/", logger, auth("admin"), userControllers.getUser)

//! User Get single Route
router.get("/:id", auth("admin", "user"), userControllers.getSingleUser)

//! User Update Single Users
router.put("/:id", auth("admin", "user"), userControllers.updateSingleUser)

//! Delete user from DB
router.delete("/:id", auth("admin", "user"), userControllers.deleteUser)

export const userRoutes = router;