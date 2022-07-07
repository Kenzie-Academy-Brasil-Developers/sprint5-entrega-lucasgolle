import { IUserLogin } from "../interfaces";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new Error("Wrong ameil/passwordss");
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new Error("Wrong email/password");
  }

  const token = jwt.sign({ message: "Oi mundo"}, String(process.env.SECRET_KEY), {
    expiresIn: "24h",
  });

  return token;
};

export default userLoginService;
