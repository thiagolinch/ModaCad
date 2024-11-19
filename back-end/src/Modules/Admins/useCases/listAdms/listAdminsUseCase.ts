import { inject, injectable } from "tsyringe";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";

interface IResponse {
    users: Admins[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(
        role: string,
        plan_id: string,
        status_id: string,
        page: number = 1,
        limit: number = 10,
        order: 'DESC' | 'ASC' = 'DESC'): Promise<IResponse> {

        const data = await this.adminRepo.listUsers(
            role,
            page,
            plan_id,
            status_id,
            order,
            limit
        )
        
        return data;
    }

}

export { ListUsersUseCase }