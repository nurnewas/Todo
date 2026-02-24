import express, { NextFunction, Request, Response } from "express"
import config from "./config"
import initDB, { pool } from "./config/db"
import logger from "./middleware/logger"
import { userRoutes } from "./modules/users/users.route"




const app = express()
const port = config.port
// parser
app.use(express.json())



// Initializing DB
initDB()


//! main Route(Local host -> localhost:8080/)
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello World!')
})

//! Users CRUD
app.use('/users', userRoutes)
// app.post('/users', logger, async (req: Request, res: Response) => {
//     const { name, email } = req.body

//     try {
//         const result = await pool.query(`
//     INSERT INTO users(name,email) VALUES($1, $2) RETURNING *
//     `, [name, email])
//         // console.log(result.rows[0]);
//         res.status(201).json({
//             success: true,
//             message: "Data inserted successfully"
//         })
//     } catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
// })

//! Get all Users 
app.get("/users", logger, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
    SELECT * FROM users
    `)
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
})


//! get Single User by Id 
app.get("/users/:id", logger, async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [req.params.id])

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
})

//! Single user update 
app.put("/users/:id", logger, async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { name, email } = req.body;
    try {
        const result = await pool.query(`
            UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *
            `, [name, email, req.params.id])

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
})

//! Delete user from DB
app.delete("/users/:id", logger, async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await pool.query(`
            DELETE FROM users WHERE id = $1
            `, [req.params.id])

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        } else {
            res.status(201).json({
                success: true,
                message: "User Deleted",
                data: null,
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: " User Not found "
        })
    }
})


//! Todos CRUD

//! Update Single User
app.post("/todos", logger, async (req: Request, res: Response) => {
    const { user_id, title } = req.body
    try {

        const result = await pool.query(`
                INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *
                `, [user_id, title])
        res.status(201).json({
            success: true,
            message: " Todo added in table",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(400).json({
            success: true,
            message: err.message
        })
    }
})


//! Get Todos
app.get("/todos", logger, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
    SELECT * FROM todos
    `)
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
})

//! get Single Todo by Id 
app.get("/todos/:id", logger, async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await pool.query(`
            SELECT * FROM todos WHERE id = $1
            `, [req.params.id])

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
})


//! Single user update 
app.put("/todos/:id", logger, async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { user_id, title } = req.body;
    try {
        const result = await pool.query(`
            UPDATE todos SET user_id=$1, title=$2 WHERE id=$3 RETURNING *
            `, [user_id, title, req.params.id])

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
})

app.delete("/todos/:id", logger, async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await pool.query(`
            DELETE FROM todos WHERE id = $1
            `, [req.params.id])

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "todos Not Found"
            })
        } else {
            res.status(201).json({
                success: true,
                message: "Todos Deleted",
                data: null,
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: " todos Not found "
        })
    }
})


//! 404
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        data: req.path
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
