import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"

import { Admins } from "../../entity/Admins";

import { IAdminsRepository, IAdminsRepositoryDTO } from "../../repository/IAdminsRepository";

@injectable()
class CreateAdmUseCase {
    constructor(
        @inject("AdminsRepository")
        private adminsRepository: IAdminsRepository
    ) {}
    async execute({
        name,
        email,
        password,
        cellphone
    }: IAdminsRepositoryDTO): Promise<Admins> {
        const adminExists = await this.adminsRepository.findByEmail(email)

        if(adminExists) {
            throw new Error("This admin account already exists!").message

        }

        const passwordCrypt = await hash(password, 8)

        const admin = await this.adminsRepository.create({
            name,
            email,
            password,
            cellphone
        })

        return admin
    }
}

export { CreateAdmUseCase }