import { Request, Response } from "express";

const userListController = async (req: Request, res: Response) => {
  try {
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
