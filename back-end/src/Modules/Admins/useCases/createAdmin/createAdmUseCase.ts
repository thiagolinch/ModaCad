import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"

import { Admins } from "../../entity/Admins";

import { IAdminsRepository, IAdminsRepositoryDTO } from "../../repositories/IAdminsRepository";
import { IAdminRoleRepository } from "../../repositories/IAdminRole";
import { IMailProvider } from "../../../../Shared/container/providers/MailProvider/IMailProvider";
import { resolve } from "path";

@injectable()
class CreateAdmUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepository: IAdminsRepository,
        @inject("AdminRoleRepository")
        private roleRepo: IAdminRoleRepository,
        @inject("ZohoMailProvaider")
        private zohoMailProvider: IMailProvider
    ) {}
    async execute({
        email,
        role
    }: IAdminsRepositoryDTO): Promise<void> {
        const adminExists = await this.adminRepository.findByEmail(email)

        if(adminExists) {
            throw new Error("This admin account already exists!")

        }

        const password = Math.random().toString(36).substring(0, 7)
        const passwordCrypt = await hash(password, 8)

        const admin = await this.adminRepository.createStaff(
            email,
            passwordCrypt,
            role
        )

        const variables = {
            email: email,
            senha: password,
            link: 'https://lobster-app-n6jep.ondigitalocean.app/admin/login'
        }

        const templatePath = resolve(__dirname, "..", "..", "views", "email", "newStaffAccount.hbs");
        const mail = await this.zohoMailProvider.sendMail(email, "Bem vindo Staff MODACAD", variables, templatePath)
    }
}

export { CreateAdmUseCase }