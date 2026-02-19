import express, { Request, Response } from "express"
import { Pool } from "pg"
import dotenv from "dotenv"
import path from "path"


dotenv.config({ path: path.join(process.cwd(), '.env') })
const app = express()
const port = 8080
// parser
app.use(express.json())
// app.use(express.urlencoded())


//DB
const pool = new Pool({
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


//! main Route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

//! Post Route 
app.post('/users', async (req: Request, res: Response) => {
    const { name, email } = req.body

    try {
        const result = await pool.query(`
    INSERT INTO users(name,email) VALUES($1, $2) RETURNING *
    `, [name, email])
        console.log(result);

        res.send({ message: "Data Inserted" })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

    res.status(200).json({
        success: true,
        message: "Api Is working "
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
