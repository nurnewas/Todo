import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()


//* http://localhost:8080/auth/login
router.post("/login", authController.loginUser)

export const authRoute = router;