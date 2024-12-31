import { inject, injectable } from "tsyringe"
import { IAdminsRepository } from "../../repositories/IAdminsRepository"
import { IStorageProvider } from "../../../../Shared/container/providers/StorageProvider/IStorageProvider"
import { Admins } from "../../entity/Admins"

@injectable()
class AdminProfileUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ){};

    async execute(admin_id: string): Promise<Admins> {
        const admin = await this.adminRepo.findById(admin_id)
        return admin
    }

}

export { AdminProfileUseCase }