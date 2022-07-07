import { Request, Response } from "express";
import userUpdatePasswordService from "../services/userUpdate.service";

const userUpdatePasswordController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      throw new Error("No password informed.");
    }

    const user = await userUpdatePasswordService(id, password);

    return res.status(201).json({ message: "Password updated" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userUpdatePasswordController;
