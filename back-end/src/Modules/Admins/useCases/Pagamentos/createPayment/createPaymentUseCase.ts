import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";

interface IResponse {

}


@injectable()
export class CreatepaymenteUseCase {
    constructor(
        @inject("AdminRepository")
        private admRepo: IAdminsRepository,
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider
    ) {}

    async execute(
        id: string,
        transaction_amount: number,
        description: string,
        payment_method_id?: string,
        token?: string,
        doc_type?: string,
        doc_number?: string
    ): Promise<IResponse> {
        const user = await this.admRepo.findById(id)
        const email = user.email

        const response = await this.mpRepo.create(
            transaction_amount,
            description,
            email,
            payment_method_id,
            token
        )

        return response
    }
}