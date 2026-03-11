import bcrypt from 'bcryptjs';
import { pool } from "../../config/db"
import jwt from 'jsonwebtoken'
import config from '../../config';


const userLogin = async (email: string, password: string) => {
    console.log({ email });
    const result = await pool.query(`
    SELECT * FROM users WHERE email = $1 
    `, [email]);
    console.log({ result });
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password)

    console.log({ match, user });
    if (!match) {
        return false;
    }
    const token = jwt.sign({ name: user.name, email: user.email }, config.jwtSecret as string, { expiresIn: "1d" })

    console.log({ token });
    return { token, user }
}


export const authServices = {
    userLogin,

}