import express, { NextFunction, Request, Response } from "express"
import { Pool } from "pg"
import dotenv from "dotenv"
import path from "path"
import logger from "./middleware/logger"
import { userRoutes } from "./modules/users/users.route"
import { userControllers } from "./modules/users/users.controller"




dotenv.config({ path: path.join(process.cwd(), '.env') })
const app = express()
const port = 8080
// parser
app.use(express.json())
// app.use(express.urlencoded())


//DB
export const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STRING}`
})

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        Address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)


    await pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)
}
initDB()


//! main Route == localhost:8080 ==> "/"
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello World!')
})

//! Users CRUD
//? localhost:8080/user ==> "/"
app.use("/users", userRoutes)



//! Todos CRUD
//? Update Single User
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
//! 404app   res.status(404).json({        success: false,        message: "Not Found",        data: req.path    })})app.listen(port, () => {    console.log(`Example app listening on port ${port}`)})
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