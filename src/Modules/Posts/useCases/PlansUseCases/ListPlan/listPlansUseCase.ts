import { inject, injectable } from "tsyringe";
import { IPlansRepository } from "../../../repository/IPlansRepository";
import { Plans } from "../../../entity/Plans";


@injectable()
export class ListPlansUseCase {
    constructor(
        @inject("PlanRepository")
        private repository: IPlansRepository
    ) {}

    async execute(): Promise<Plans[]> {
        const plans = await this.repository.list()
        
        // Verifique se você está acessando a propriedade 'price' corretamente
        plans.forEach(plan => {
            console.log(plan.price); // Isso deve imprimir o valor de price se estiver corretamente mapeado
        });

        return plans;
    }
}