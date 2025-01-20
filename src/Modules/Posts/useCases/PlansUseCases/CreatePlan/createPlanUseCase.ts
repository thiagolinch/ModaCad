import { inject, injectable } from "tsyringe";
import { IPlansRepository, IPlansRepositoryDTO } from "../../../repository/IPlansRepository";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";
import { Plans } from "../../../entity/Plans";

@injectable()
export class CreatePlanUseCase {
    constructor(
        @inject("PlanRepository")
        private repository: IPlansRepository,
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider,
    ) {}

    async execute({
        title,
        topics,
        price,
        sort,
        description,
        frequency,
        frequency_type,
        currency_id,
        repetitions,
        isRecurrence
    }: IPlansRepositoryDTO): Promise<Plans> {
        let mp_url = ""
        let mp_id = ""


        if(isRecurrence === true ) {
            let data = await this.mpRepo.createPlan(
                title,
                frequency,
                frequency_type,
                price,
                currency_id,
                repetitions,
                "https://blog.modacad.com.br"
            )
    
            mp_url = data.init_point;
            mp_id = data.id;
        }
        
        const plan = await this.repository.create({
            title,
            topics,
            price,
            sort,
            description,
            frequency,
            frequency_type,
            currency_id,
            repetitions,
            isRecurrence,
            mp_url,
            mp_id
        })

        return plan
    }
}