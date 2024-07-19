import  Router  from "express";
import userController from "../controller/user-controller.js";
import {body} from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/registration", body('email').isEmail(),body('password').isLength({min:4}), userController.registartion);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware(), userController.getUsers);

export default router;