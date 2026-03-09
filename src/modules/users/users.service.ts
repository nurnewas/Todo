import { Result } from "pg"
import { pool } from "../../config/db"


//! Post user DB Logic
const createUserLogic = async (name: string, email: string) => {
    const result = await pool.query(`
    INSERT INTO users(name,email) VALUES($1, $2) RETURNING *
    `, [name, email])
    return result
}

//! Get user DB Logic
const getUserLogic = async () => {
    const result = await pool.query(`
    SELECT * FROM users
    `)
    return result;
}

//! get Single User DB Logic
const getSingleUserLogic = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id])
    return result
}

//! User Update Single Users
const updateSingleUser = async (name: string, email: string, id: string) => {
    const result = await pool.query(`
            UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *
            `, [name, email, id])
    return result;
}


//! Delete user from DB
const deleteUser = async (id: string) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id = $1
            `, [id])
    return result;
}


export const userService = { createUserLogic, getUserLogic, getSingleUserLogic, updateSingleUser, deleteUser }