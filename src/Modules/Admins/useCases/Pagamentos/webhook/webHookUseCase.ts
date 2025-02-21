import { inject, injectable } from "tsyringe";
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { IPlansRepository } from "../../../../Posts/repository/IPlansRepository";

@injectable()
export class WebhookUseCase {
    constructor(
        @inject("MPagoProvider")
        private mpRepo: IMercadoPagoProvider,
        @inject("AdminRepository")
        private userRepo: IAdminsRepository,
        @inject("PlanRepository")
        private planRepo: IPlansRepository
    ) {}

    async execute(id: string): Promise<void> {        
        const payment = await this.mpRepo.getPayment(id);
        const externalReference = JSON.parse(payment.external_reference);

        const userId = externalReference.user_id;
        const user = await this.userRepo.findById(userId);

        if(!user) {
            throw new Error("Usuário não encontrado");
        }

        const planId = externalReference.plan_id;
        const plan = await this.planRepo.findById(planId);

        if(!plan) {
            throw new Error("Plano não encontrado");
        }

        switch (payment.status) {
            case "approved": 
                plan.price > 0 ? user.role = "assinante" : user.role = "membro";
                user.plan = plan.id;
                await this.userRepo.updatePlan(user);
            break;
        
            case "rejected":
                
                user.role = user.role === "assinante" ? user.role = "ex-assinante" : user.role = "membro";
                user.plan = null;

                await this.userRepo.updatePlan(user);
            break;
        }
    }
}