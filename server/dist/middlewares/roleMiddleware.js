import jwt from "jsonwebtoken";
export default function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTION") {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json('user not has authorization');
            }
            let hasAccess = false;
            const { role: role } = jwt.verify(token, process.env.SECRET);
            roles.forEach((el) => {
                if (el.includes(role)) {
                    hasAccess = true;
                }
            });
            if (!hasAccess) {
                return res.status(403).json("no Access :(");
            }
            next();
        }
        catch (e) {
            throw new Error("not acsess:(");
        }
    };
}
//# sourceMappingURL=roleMiddleware.js.map