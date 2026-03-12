import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction } from 'express';
// higher oder function return also a function

import { Request, Response } from "express"
import config from '../config';
// roll = ["admin", "user"]
const auth = (...role: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            console.log({ authToken: token });
            if (!token) {
                return res.status(500).json({ message: " You are not allow" })
            }
            const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload
            console.log({ decoded });
            req.user = decoded;


            if (role.length && !role.includes(decoded.role as string)) {
                return res.status(500).json({
                    error: "UnAuthorise !!!"
                })
            }
            next()
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

export default auth;