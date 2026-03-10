import express, { Request, Response } from "express"
import logger from "./middleware/logger"
import { userRoutes } from "./modules/users/users.route"
import { todoRoutes } from "./modules/todos/todos.route"
import config from "./config"
import initDB from "./config/db"
import { authRoute } from "./modules/auth/auth.route"



const app = express()
const port = config.port
app.use(express.json())




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
app.use("/todos", todoRoutes)

//! Auth CRUD
app.use("/auth", authRoute)


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