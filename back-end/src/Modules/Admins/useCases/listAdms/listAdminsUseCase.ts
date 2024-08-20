import { inject, injectable } from "tsyringe";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";


@injectable()
class ListAdminsUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(): Promise<Admins[]> {
        const admins = await this.adminRepo.listAll()
        
        return admins;
    }

}

export { ListAdminsUseCase }