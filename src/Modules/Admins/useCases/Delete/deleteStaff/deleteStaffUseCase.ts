import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class DeleteStaffUseCase {
    constructor(
        @inject("AdminRepository")
        private repository: IAdminsRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.repository.deleteStaff(id)
    }
}