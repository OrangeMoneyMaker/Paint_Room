import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail-service.js";
import UserDto from "../dtos/user-dto.js";
import tokenService from "./token-service.js";
import ApiError from "../exceptions/api-error.js";
class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest("User alrady exist");
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuidv4();
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refresh_token);
        await mailService.sendActivationMail(userDto.email, `${process.env.API_URL}/api/activate/${activationLink}`);
        return {
            ...tokens,
            user: userDto
        };
    }
    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User not found");
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            throw ApiError.BadRequest("Password iscorrect");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refresh_token);
        return {
            ...tokens,
            user: userDto
        };
    }
    async logout(refreshToken) {
        const deleteToken = await tokenService.removeToken(refreshToken);
        return deleteToken;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findeToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findOne({ email: userData.data.email });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        console.log(tokens);
        await tokenService.saveToken(userDto.id, tokens.refresh_token);
        return {
            ...tokens,
            user: userDto
        };
    }
    async getUsers() {
        const users = await UserModel.find();
        return users;
    }
    async activate(activationLink) {
        let activateUser = await UserModel.findOne({ activationLink });
        if (!activationLink) {
            throw ApiError.BadRequest("link is inccorect");
        }
        activateUser.isActivated = true;
        activateUser.save();
    }
}
export default new UserService();
//# sourceMappingURL=user-service.js.map