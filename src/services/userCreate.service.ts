import { IUserRequest } from "../interfaces";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import bycrypt from "bcrypt";

const createUserService = async ({
  name,
  email,
  age,
  password,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    return "Email already exists";
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.age = age;
  user.password = bycrypt.hashSync(password, 10);

  userRepository.create(user);
  await userRepository.save(user);

  return {...user, password: undefined};
};

export default createUserService;
