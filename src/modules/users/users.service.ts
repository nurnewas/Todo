import { Result } from "pg"
import { pool } from "../../config/db"


//! Post user DB Logic
const createUserLogic = async (name: string, email: string) => {
    const result = await pool.query(`
    INSERT INTO users(name,email) VALUES($1, $2) RETURNING *
    `, [name, email])
    return result
}

const getUserLogic = async () => {
    const result = await pool.query(`
    SELECT * FROM users
    `)
    return result;
}

export const userService = { createUserLogic, getUserLogic }