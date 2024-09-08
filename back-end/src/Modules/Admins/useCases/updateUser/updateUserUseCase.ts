import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";


@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("AdminRepository")
        private admRepo: IAdminsRepository
    ) {}

    async execute(
        id: string,
        name: string,
        cellphone: string,
        email: string,
        role: string,
        status_id: string,
        plan_id: string
    ): Promise<void> {
        const user = await this.admRepo.findById(id)

        if(!user) {
            throw new Error("Usuário não encontrado").message
        }

        await this.admRepo.update(
            id,
            name,
            cellphone,
            email,
            role,
            status_id,
            plan_id
        )

    }
}

export { UpdateUserUseCase }