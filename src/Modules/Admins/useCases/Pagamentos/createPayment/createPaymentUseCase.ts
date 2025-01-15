import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";
import { IPlansRepository } from "../../../../Posts/repository/IPlansRepository";

interface IResponse {

}


@injectable()
export class CreatepaymenteUseCase {
    constructor(
        @inject("AdminRepository")
        private admRepo: IAdminsRepository,
        @inject("PlanRepository")
        private planRepo: IPlansRepository,
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider
    ) {}

    async execute(
        id: string,
        plan_id: string
    ): Promise<IResponse> {
        const user = await this.admRepo.findById(id)
        const plan = await this.planRepo.findById(plan_id)

        const response = await this.mpRepo.create(
            plan.price,
            plan.description,
            user.email,
            user.name,
            1,
            plan.title,
            plan.id
        )

        return response
    }
}