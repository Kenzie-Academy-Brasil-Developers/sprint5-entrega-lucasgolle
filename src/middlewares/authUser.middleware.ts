import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid tokensss",
    });
  }

  const splitToken = token.split(" ")[1];

  console.log(splitToken);

  const secret = process.env.SECRET_KEY;

  console.log(secret);



  const testJwt = jwt.verify(splitToken, secret!, (error, decoded) => {
    console.log(decoded);
  });

  console.log(testJwt)
  // if(!decoded){
  //     return res.status(401).json({
  //         message: "Invalid token"
  //     })
  // }

  //  const { userId } = <any>decoded;

  //  req.idUser = userId
  // })

  return next();
};
