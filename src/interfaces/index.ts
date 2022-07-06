// export interface IUserRequest {
//   name: string;
//   email: string;
//   password: string;
//   age: number;
// }

// export interface IUser {
//   name: string;
//   email: string;
//   id?: string;
//   password: string;
//   age: number;
//   created_at: Date;
//   updatedAt_at: Date;
// }

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserList {
  authorization?: string;
}
