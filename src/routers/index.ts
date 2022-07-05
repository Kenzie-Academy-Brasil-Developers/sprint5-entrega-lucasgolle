import Router from "express";
import userCreateController from "../controllers/userCreate.controller";

const userRoutes = Router();

userRoutes.post("", userCreateController);

userRoutes.get("", );

export default userRoutes;
