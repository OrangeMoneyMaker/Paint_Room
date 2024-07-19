import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../models/User";

export default class UserService{
    static getUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>("/users");
    }
}