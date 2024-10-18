import { inject, injectable } from "tsyringe";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";



@injectable()
export class CreatePlanMPUseCase {
    constructor(
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider
    ) {}

    async execute(
        reason,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string
    ): Promise<any> {
        const data = await this.mpRepo.createPlan(
            reason,
            frequency,
            frequency_type,
            transaction_amount,
            currency_id,
            repetitions,
            back_url
        )

        return data;
    }
}