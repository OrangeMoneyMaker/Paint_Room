import { IUser } from "../User";

export interface IAuthResponse{
    access_token: string,
    refresh_token: string,
    user: IUser
}