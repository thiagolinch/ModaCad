import { inject, injectable } from "tsyringe";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";


@injectable()
class ListStafUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(): Promise<Admins[]> {
        const admins = await this.adminRepo.findStaff()
        
        return admins;
    }

}

export { ListStafUseCase }