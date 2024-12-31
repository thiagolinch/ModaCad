import { inject, injectable } from "tsyringe";
import { IPlansRepository } from "../../../repository/IPlansRepository";



@injectable()
export class DeletePlanUseCase {
    constructor(
        @inject("PlanRepository")
        private repository: IPlansRepository
    ) {}

    async execute(id: string): Promise<void> {
        const plan = await this.repository.findById(id)

        if(!plan) {
            throw new Error("Plano não encontrado")
        }

        await this.repository.delete(id)
    }
}