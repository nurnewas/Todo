import express, { Request, Response } from "express"
import { userRoutes } from "./modules/users/users.route"
import { todoRoutes } from "./modules/todos/todos.route"
import { authRoute } from "./modules/auth/auth.route"
import config from "./config"
import initDB from "./config/db"

const app = express()


app.use(express.json())

initDB()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use("/users", userRoutes)
app.use("/todos", todoRoutes)
app.use("/auth", authRoute)

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        data: req.path
    })
})



export default app;