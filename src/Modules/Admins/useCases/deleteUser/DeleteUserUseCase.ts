import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";



@injectable()
export class DeleteUserUseCase {
    constructor(
        @inject("AdminRepository")
        private repository: IAdminsRepository
    ) {}

    async execute(id: string): Promise<void> {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new Error("Usuario nao encontrado")
        }

        await this.repository.delete(id)
    }
}