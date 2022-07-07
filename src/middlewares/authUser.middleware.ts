import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import nodeTest from "node:test";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    const splitToken = token.split(" ")[1]

    const secret = process.env.SECRET_KEY;

    jwt.verify(splitToken, secret!, (error, decoded) => {
        if(!decoded){
            return res.status(401).json({
                message: "Invalid token"
            })
        }

         const { userId } = <any>decoded;

         req.idUser = userId
        })

        return next();
  
};
