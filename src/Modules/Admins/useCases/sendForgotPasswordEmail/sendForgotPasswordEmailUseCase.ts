import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 }  from "uuid"
import { resolve } from "path"
import { AdminTokenRepository } from "../../repositories/implements/AdminTokenRepository";
import { IDateProvider } from "../../../../Shared/container/providers/DateProvider/IDateProvider";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { IMailProvider } from "../../../../Shared/container/providers/MailProvider/IMailProvider";
import 'dotenv/config';


@injectable()
class SendForgotPasswordUseCase {
    constructor(
        @inject("AdminTokenRepository")
        private userTokenRep: AdminTokenRepository,
        @inject("DaysJSDateProvider")
        private dayJsProvider: IDateProvider,
        @inject("AdminRepository")
        private userRepository: IAdminsRepository,
        @inject("ZohoMailProvaider")
        private zohoMailProvider: IMailProvider
    ){}

    async execute(email: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new Error("account does not exists").message
        };

        const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgotPassword.hbs");

        const token = uuidV4();
        const expires_dates = this.dayJsProvider.addHours(10)

        await this.userTokenRep.create({
            refresh_token: token,
            admin_id: user.id,
            expires_date: expires_dates
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        const mail = await this.zohoMailProvider.sendMail(email, "Recuperação de senha", variables, templatePath)

        return mail
    }
}

export { SendForgotPasswordUseCase }