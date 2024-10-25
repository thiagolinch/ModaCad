import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 }  from "uuid"
import { resolve } from "path"
import { AdminTokenRepository } from "../../repositories/implements/AdminTokenRepository";
import { IDateProvider } from "../../../../Shared/container/providers/DateProvider/IDateProvider";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { IMailProvider } from "../../../../Shared/container/providers/MailProvider/IMailProvider";


@injectable()
class SendForgotPasswordUseCase {
    constructor(
        @inject("AdminTokenRepository")
        private adminsTokenRep: AdminTokenRepository,
        @inject("DaysJSDateProvider")
        private dayJsProvider: IDateProvider,
        @inject("AdminRepository")
        private adminRepository: IAdminsRepository,
        @inject("ZohoMailProvaider")
        private zohoMailProvider: IMailProvider
    ){}

    async execute(email: string): Promise<any> {
        const admin = await this.adminRepository.findByEmail(email);

        if(!admin) {
            throw new Error("account does not exists").message
        }

        const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgotPassword.hbs");

        const token = uuidV4();
        const expires_date = this.dayJsProvider.addHours(3)

        await this.adminsTokenRep.create({
            refresh_token: token,
            admin_id: admin.id,
            expires_date
        });

        const variables = {
            name: admin.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        const mail = await this.zohoMailProvider.sendMail(email, "Recuperação de senha", variables, templatePath)

        return mail
    }
}

export { SendForgotPasswordUseCase }