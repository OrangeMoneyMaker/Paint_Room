import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IUser } from "../models/User";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

class UserStore{
    user: IUser
    isAuth: boolean
    isLoading: boolean
    constructor(){
        this.user = {} as IUser;
        this.isAuth = false;
        this.isLoading = false;
        makeAutoObservable(this);
    }

    setUser(user: IUser){
        this.user = user
    }

    setAuth(isAuth: boolean){
        this.isAuth = isAuth
    }

    async login(email: string, password: string){
        try{
            const response = await AuthService.login(email, password);
            console.log(response.data.user)
            localStorage.setItem("token", response.data.access_token)
            this.setUser(response.data.user);
            this.setAuth(true);
        } catch(e){
            console.log(e)
        }           
    }

    async registration(email: string, password: string){
        try{
            const response = await AuthService.registration(email, password);
            localStorage.setItem("token", response.data.access_token)
            this.setUser(response.data.user);
            this.setAuth(true);
        } catch(e){
            console.log(e)
        }  
    }

    async logout(){
        try{
            await AuthService.logout();
            localStorage.removeItem("token");
            this.setUser({} as IUser)
            this.setAuth(false);
        } catch(e){
            console.log(e);
        }
        
    }

    async checkAuth(){
        try{
            this.isLoading = true;
            const response = await axios.get(`${API_URL}/refresh`,{withCredentials: true});
            localStorage.setItem("token",response.data.refresh_token);
            this.setUser(response.data.user);
            this.setAuth(true)
        } catch(e){
            console.log(e)
        } finally{
            this.isLoading = false;
        }
       
    }
}

export default new UserStore();