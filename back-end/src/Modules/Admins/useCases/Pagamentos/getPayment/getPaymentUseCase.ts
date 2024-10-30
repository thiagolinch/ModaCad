import { inject, injectable } from "tsyringe";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";

interface IRequest {

}

@injectable()
export class GetPaymentUseCase {
    constructor(
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider
    ) {}

    async execute(id: string): Promise<any> {
        const payment = await this.mpRepo.getPayment(id)

        return payment
    }
}