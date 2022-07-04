export interface IUserRequest {
    name: string;
    email: string;
    password: string;
    age: number;
}

export interface IUser {
    name: string;
    email: string;
    id: string;
    password: string;
    age: number;
    created_at: Date;
}