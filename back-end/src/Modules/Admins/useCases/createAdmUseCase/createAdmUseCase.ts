import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"

import { Admins } from "../../entity/Admins";

import { IAdminsRepository, IAdminsRepositoryDTO } from "../../repositories/IAdminsRepository";

@injectable()
class CreateAdmUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepository: IAdminsRepository
    ) {}
    async execute({
        name,
        email,
        password,
        cellphone,
        admin_role_id
    }: IAdminsRepositoryDTO): Promise<Admins> {
        const adminExists = await this.adminRepository.findByEmail(email)

        if(adminExists) {
            throw new Error("This admin account already exists!").message

        }

        const passwordCrypt = await hash(password, 8)

        const admin = await this.adminRepository.create({
            name,
            email,
            password: passwordCrypt,
            cellphone,
            admin_role_id
        })

        return admin
    }
}

export { CreateAdmUseCase }