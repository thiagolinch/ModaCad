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
        installments?: number,
        payment_method_id?: string,
        issuer_id?: number,
        token?: string,
        doc_type?: string,
        doc_number?: string
    ): Promise<IResponse> {
        const user = await this.admRepo.findById(id)
        const email = user.email
        console.log(email)
        const body = {

            payer: {
              email: user.email,
              identification: {
                type: doc_type,
                number: doc_number,
              },
            },
          };

        const response = await this.mpRepo.create(
            transaction_amount,
            description,
            installments,
            payment_method_id,
            issuer_id,
            token,
            email,
            doc_type,
            doc_number,
        )

        return response
    }
}