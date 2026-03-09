import { Result } from "pg";
import { pool } from "../../config/db"

const createTodo = async (user_id: number | string, title: string) => {
    const result = await pool.query(`
                INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *
                `, [user_id, title]
    )
    return result;
}


//! get todos
const getTodos = async () => {
    const result = await pool.query(`
    SELECT * FROM todos
    `)
    return result;
}

const getSingleTodo = async (id: any) => {
    const result = await pool.query(`
            SELECT * FROM todos WHERE id = $1
            `, [id])
    return result;
}

//! Single Todo update 
const singleTodoUpdate = async (user_id:string, title: string, id: string) =>{
    const result = await pool.query(`
            UPDATE todos SET user_id=$1, title=$2 WHERE id=$3 RETURNING *
            `, [user_id, title, id])
            return result
}

//! delete Todo
const deleteTodo = async (id: string) => {
  const result = await pool.query("DELETE FROM todos WHERE id=$1 RETURNING *", [
    id,
  ]);
  return result;
};

export const todoService = {
    createTodo,
    getTodos,
    getSingleTodo,
    singleTodoUpdate,
    deleteTodo
}