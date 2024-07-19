import userService from "../service/user-service.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";
import 'dotenv/config';
class UserController {
    async registartion(req, res, next) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                throw ApiError.BadRequest("Validation error", error.array());
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            let { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie("refreshToken", userData.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            let { refreshToken } = req.cookies;
            const deleteToken = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            //res.redirect(process.env.CLIENT_URL);
            return res.json(deleteToken);
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const data = await userService.refresh(refreshToken);
            return res.json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            userService.activate(req.params.link);
            res.redirect("https://www.google.com/");
        }
        catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
}
export default new UserController();
//# sourceMappingURL=user-controller.js.map