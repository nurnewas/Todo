import { Request, Response } from "express"
import { todoService } from "./todos.service"


//! Create Todos 
const createTodos = async (req: Request, res: Response) => {
    const { user_id, title } = req.body
    try {
        const result = await todoService.createTodo(user_id, title)
        res.status(201).json({
            success: true,
            message: "Todo added in table",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false, // 
            message: err.message
        })
    }
}

//! Get Todos 
const getTodos = async (req: Request, res: Response) => {
    try {
        const result = await todoService.getTodos()
        res.status(201).json({
            success: true,
            message: "Todos retrieved successfully ",
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

const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoService.getSingleTodo(req.params.id)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todos Not Found"
            })
        } else {
            res.status(201).json({
                success: true,
                message: "Todo Fetched Successfully",
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

//! Single Todo update 
const updateUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { user_id, title } = req.body;
    try {
        const result = await todoService.singleTodoUpdate(user_id, title, req.params.id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todo Not Found"
            })
        } else {
            res.status(201).json({
                success: true,
                message: "Todo Updated Successfully",
                data: result.rows[0]
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There is no todo"
        })
    }
}

// Delete Todo 
const deleteTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoService.deleteTodo(req.params.id as string);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ success: true, message: "Todo deleted", data: null });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
};
export const todoController = {
    createTodos,
    getTodos,
    getSingleTodo,
    updateUser,
    deleteTodo
}
