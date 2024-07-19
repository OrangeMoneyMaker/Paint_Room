import nodemailer from "nodemailer";
import ApiError from "../exceptions/api-error.js";
import "dotenv/config";
class MailService {
    async sendActivationMail(email, link) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            });
            const info = await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "Activate",
                text: "Activate link",
                html: `<div><a href=${link}>CLICK</a></div>`
            });
        }
        catch (e) {
            throw ApiError.BadRequest("Incorrect email");
        }
    }
}
export default new MailService();
//# sourceMappingURL=mail-service.js.map