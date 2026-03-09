import express from 'express';
import { todoController } from './todos.controller';


//? app.user("/users") => userRoute
// route => controller => service 
export const router = express.Router()

router.post("/", todoController.createTodos)


export const todoRoutes = router;