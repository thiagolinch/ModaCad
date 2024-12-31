import { inject, injectable } from "tsyringe";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";

interface IResponse {
    staffs: Admins[];
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalStaff: number;
    totalAdministradores: number;
    totalEditores: number;
    totalAutores: number;
    totalColaboradores: number
}

@injectable()
class ListStafUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(
        page: number = 1,
        limit: number = 10,
        order: 'DESC' | 'ASC' = 'DESC'
    ): Promise<IResponse> {
        const admins = await this.adminRepo.listStaff(
            page,
            order,
            limit
        )
        
        return admins;
    }

}

export { ListStafUseCase }