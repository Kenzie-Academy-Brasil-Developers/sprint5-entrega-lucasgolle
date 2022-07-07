import { Request, Response } from "express";
import userListService from "../services/userList.service";

const userListController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const user = await userListService(id);

    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userListController;
