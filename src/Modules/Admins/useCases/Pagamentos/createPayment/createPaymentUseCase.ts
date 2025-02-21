import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";
import { IPlansRepository } from "../../../../Posts/repository/IPlansRepository";

interface IResponse {
    url: string
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

        if(plan.frequency == 12) {	
            const response = await this.mpRepo.pay(
                user,
                plan
            )
            user.payment_id = response.id;
            await this.admRepo.updatePlan(user);
            return {
                url: response.init_point
            }
        }

        const response = await this.mpRepo.payPlan(
            user,
            plan
        )
        user.payment_id = response.id;

        await this.admRepo.updatePlan(user);

        return {
            url: response.init_point
        }
    }
}