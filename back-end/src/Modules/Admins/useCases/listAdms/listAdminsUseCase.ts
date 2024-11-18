import { inject, injectable } from "tsyringe";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";


@injectable()
class ListUsersUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(role: string, plan_id?: string, status_id?: string): Promise<Admins[]> {

        const data = await this.adminRepo.listUsers(role, plan_id, status_id)
        
        return data;
    }

}

export { ListUsersUseCase }