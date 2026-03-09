import express from 'express';
import { todoController } from './todos.controller';


//? app.user("/users") => userRoute
// route => controller => service 
export const router = express.Router()

//! Create Todos 
router.post("/", todoController.createTodos)

//! Get Todos
router.get("/", todoController.getTodos)

//! Get single Todo
router.get("/:id", todoController.getSingleTodo)

//! Single Todo update 
router.put("/:id", todoController.updateUser)



export const todoRoutes = router;