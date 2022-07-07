import { Request, Response } from "express";
import userDeleteService from "../services/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const user = await userDeleteService(id);

        return res.status(200).json({ message: "User deleted" })

    } catch(err){
        if (err instanceof Error) {
            return res.status(401).send({
              error: err.name,
              message: err.message,
            });
          }
    }
}

export default userDeleteController;