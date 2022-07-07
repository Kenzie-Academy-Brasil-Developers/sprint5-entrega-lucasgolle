import Router from "express";
import userCreateController from "../controllers/userCreate.controller";
import userDeleteController from "../controllers/userDelete.controller";
import userListController from "../controllers/userList.controller";
import userLoginController from "../controllers/userLogin.controller";
import usersListController from "../controllers/usersList.controller";
import userUpdatePasswordController from "../controllers/userUpdate.controller";
import { authUser } from "../middlewares/authUser.middleware";

const userRoutes = Router();

userRoutes.post("", userCreateController);

userRoutes.post("/login", userLoginController);

userRoutes.get("", usersListController);

userRoutes.get("/:id", userListController);

userRoutes.patch("/:id", userUpdatePasswordController);

userRoutes.delete("/:id", userDeleteController);

export default userRoutes;
