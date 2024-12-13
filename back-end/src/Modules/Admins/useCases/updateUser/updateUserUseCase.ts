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
        status: string,
        plan_id: string
    ): Promise<void> {
        const user = await this.admRepo.findById(id)

        if(!user) {
            throw new Error("Usuário não encontrado").message
        }

        user.name = name
        user.email = email
        user.cellphone = cellphone
        user.role = role

        await this.admRepo.update(
            id,
            name,
            cellphone,
            email,
            role
        )

    }
}

export { UpdateUserUseCase }