import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const userListService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.findOne({
    where: {
      id: id
    }
  });
  
  if(!users){
    throw new Error("User not found")
  }

  return users;
};

export default userListService;



// const userListService = async ({ authorization }: IUserList) => {
//   const userRepository = AppDataSource.getRepository(User);

//   const users = await userRepository.find();

//   if (!authorization) {
//     throw new Error("No authorization token found");
//   }

//   const token = authorization;

//   const account = jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
//     if (!decoded) {
//       throw new Error("Invalid token")
//     }

//     const user = users.find(user => user.id === (<any>decoded).id)

//     return user;
//   })

//   return account;
// };

// export default userListService;