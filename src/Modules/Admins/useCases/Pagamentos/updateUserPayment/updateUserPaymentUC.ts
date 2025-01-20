import { inject, injectable } from "tsyringe";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";

interface IRequest {
    live_mode: boolean;
    type: string;
    action: string;
    payment_id: string;
    api_version: string;
    user_id: string;
    date_created: string;
    event_id: string;
}

@injectable()
export class UpdateUserPaymentUseCase {
    constructor(
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider,
        @inject("AdminRepository")
        private userRepo: IAdminsRepository
    ) {}

    async execute(paymentData: IRequest): Promise<any> {    
        console.log("payment id", paymentData.payment_id)
        
        const payment = await this.mpRepo.getPayment(paymentData.payment_id)

        console.log("payment", payment)
    }
}