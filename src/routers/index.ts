import Router from "express";
import userCreateController from "../controllers/userCreate.controller";
import usersListController from "../controllers/usersList.controller";

const userRoutes = Router();

userRoutes.post("", userCreateController);

userRoutes.get("", usersListController);

userRoutes.get(":id", );

userRoutes.patch(":id", );

userRoutes.delete(":id", );

export default userRoutes;
