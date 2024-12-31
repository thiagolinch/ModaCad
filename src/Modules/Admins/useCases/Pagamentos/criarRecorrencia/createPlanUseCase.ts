import { inject, injectable } from "tsyringe";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";

interface IRequest {
    id?: string;
    reason?: string;
    frequency?: number;
    frequency_type?: string;
    transaction_amount: number;
    payment_method_id: string;
    currency_id: string;
    token?: string;
    repetitions?: number;
    back_url: string;
    mail: string;
    free_trial?: {
        frequency: number;
        frequency_type: string;
    };
}

@injectable()
export class CreatePlanMPUseCase {
    constructor(
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider,
        @inject("AdminRepository")
        private userRepo: IAdminsRepository
    ) {}

    async execute(
        reason: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string,
        id: string
    ): Promise<any> {
        const user = await this.userRepo.findById(id)
        const data = await this.mpRepo.createPlan(
            reason,
            frequency,
            frequency_type,
            transaction_amount,
            currency_id,
            repetitions,
            back_url,
            user.email
        )

        return data;
    }
}