import ApiError from "../exceptions/api-error.js";
import jwt from "jsonwebtoken";
export default function () {
    return function (req, res, next) {
        if (req.method === "OPTION") {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (token) {
                throw ApiError.UnauthorizedError();
            }
            const verifyToken = jwt.verify(token, process.env.SECRET);
            console.log(verifyToken);
            next();
        }
        catch (e) {
            throw ApiError.UnauthorizedError();
        }
    };
}
//# sourceMappingURL=auth-middlewares.js.map