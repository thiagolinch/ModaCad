import { inject, injectable } from "tsyringe";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";

interface IRequest {

}

@injectable()
export class UpdateUserPaymentUseCase {
    constructor(
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider,
        @inject("AdminRepository")
        private userRepo: IAdminsRepository
    ) {}

    async execute(
        user_id: string,
        live_mode: boolean,
        type: string,
        action: string,
        id: string
    ): Promise<void> {
        const payment = await this.mpRepo.getPayment(id)

        if(!payment) {
            throw new Error("Pagamento nao encontrado")
        }

        if(action == "payment.created") {
            const userMP = payment.payer.email
            const user = await this.userRepo.findByEmail(userMP)

            if(!user) {
                throw new Error("usuario nao encontrado")
            }
    
            await this.userRepo.updatePayment(id, user_id)
        } 
        
        if(action !== "payment.created"){
            throw new Error("Pagamento nao sucedido.").message
        }
    }
}