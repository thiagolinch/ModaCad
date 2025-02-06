import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class RestoreStaffUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.adminRepo.restoreStaff(id)
    }
}