import { inject, injectable } from "tsyringe";
import { IPlansRepository } from "../../../repository/IPlansRepository";
import { Plans } from "../../../entity/Plans";



@injectable()
export class ViewPlanUseCase {
    constructor(
        @inject("PlanRepository")
        private repository: IPlansRepository
    ) {}

    async execute(id: string): Promise<Plans> {
        const plan = this.repository.findById(id)

        if(!plan) {
            throw new Error("Plano não encontrado")
        }

        return plan;
    }
}