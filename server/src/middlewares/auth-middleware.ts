import ApiError from "../exceptions/api-error.js";
import "dotenv/config";
import tokenService from "../service/token-service.js";

export default function(){
    return function(req, res, next){
        if(req.method === "OPTION"){
            next();
        }

        try{
            const token = req.headers.authorization.split(' ')[1];
           
            if(!token){
                throw ApiError.UnauthorizedError();
            }

            const verifyToken = tokenService.validateAccessToken(token);

            if(!verifyToken){
                throw ApiError.UnauthorizedError();
            }
            
            next()
        } catch(e){
            throw ApiError.UnauthorizedError();
        }
    }
}