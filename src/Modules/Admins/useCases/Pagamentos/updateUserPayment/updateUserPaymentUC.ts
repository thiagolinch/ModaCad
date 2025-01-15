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
        live_mode: string,
        type: string,
        action: string,
        data: string,
        api_version: string,
        user_id: string,
        date_created: string,
        id: string
    ): Promise<any> {        
        console.log("useCase: ",live_mode, type, action, data)
    }
}