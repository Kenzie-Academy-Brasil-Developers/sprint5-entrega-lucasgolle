import { Request, Response } from "express";
import usersListService from "../services/usersList.service";

const usersListController = async (req: Request, res: Response) => {
  try {
    const users = await usersListService();

    return res.status(201).json(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default usersListController;