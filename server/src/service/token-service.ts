import "dotenv/config";
import jwt from "jsonwebtoken";
import tokenModel from "../models/token-model.js";
import ApiError from "../exceptions/api-error.js";

class TokenService{
    generateToken(payload:any){
        const access_token = jwt.sign({data: payload}, process.env.SECRET, { expiresIn: '5m' });
        const refresh_token = jwt.sign({data:payload}, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'});
        return {
            access_token,
            refresh_token
        }
    }

    validateAccessToken(token: string){
        try{
            const userData = jwt.verify(token, process.env.SECRET);
            return userData;
        } catch(e){
            return null;
        }
    }

    validateRefreshToken(token: string){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch(e){
            return null;
        }
    }

    async saveToken(userId: any, refreshToken: any){
        const tokenData = await tokenModel.findOne({user: userId});
        if(tokenData){
            console.log(refreshToken)
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token  = await tokenModel.create({user:userId,  refreshToken});
        return token;
    }

    async findeToken(refreshToken: string){
        let token = tokenModel.findOne({refreshToken})
        return token;
    }

    async removeToken(refreshToken: string){
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData;
    }

    async refresh(){
        
    }
}

export default new TokenService();