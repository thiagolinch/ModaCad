import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { Admins } from "../../entity/Admins";


@injectable()
class ProfileAdminUseCase {
    constructor(
        @inject("AdminsRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute({id}): Promise<Admins> {
        const admin = await this.adminRepo.findById(id)

        if(!admin) {
            throw new Error("This admin does not exist!")
        }

        return admin
    }
}

export { ProfileAdminUseCase }