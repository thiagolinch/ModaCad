import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";

interface IRequest {
    id: string,
    transaction_amount: number,
    description: string,
    payment_method_id: string,
    token?: string
}

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

    async execute({
        id,
        transaction_amount,
        description,
        payment_method_id,
        token
    }: IRequest): Promise<IResponse> {
        const user = this.admRepo.findById(id)
        const body = {
            transaction_amount,
            description,
            payment_method_id,
            token,
            mail: (await user).email
        }

        const response = await this.mpRepo.create({
            id, transaction_amount, description, payment_method_id, token, mail: (await user).email
        })

        // const response = {
        //     id,
        //     transaction_amount,
        //     description,
        //     payment_method_id,
        //     token,
        //     "payer": {
        //         "email": (await user).email
        //     }
        // }

        return response
    }
}