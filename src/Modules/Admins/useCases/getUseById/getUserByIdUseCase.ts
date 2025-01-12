import { Admins } from "../../entity/Admins";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetUserByIdUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ){};

    async execute(id: string): Promise<Admins> {
        const userExist = await this.adminRepo.findById(id)

        if(!userExist) {
            throw new Error("Usuario nao encontrado").message
        }

        return userExist;
    }
}