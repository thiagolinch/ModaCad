import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { IAdminRoleRepository } from "../../repositories/IAdminRole";
import { IPlansRepository } from "../../../Posts/repository/IPlansRepository";



@injectable()
export class UserGetPlanUseCase {
    constructor(
        @inject("AdminRepository")
        private userRepo: IAdminsRepository,
        @inject("AdminRoleRepository")
        private roleRepo: IAdminRoleRepository,
        @inject("PlanRepository")
        private planRepo: IPlansRepository
    ) {}

    async execute(
        id: string,
        plan_id: string
    ): Promise<void> {
        const user = await this.userRepo.findById(id)
        const plan = await this.planRepo.findById(plan_id)

        if(!user) {
            throw new Error("Para adquirir um plano precisa de conta.").message
        }

        let role = 'assinante'

        if(!plan_id) {

            role = 'membro'
            plan_id = null

            await this.userRepo.updatePlan(user,role, plan_id)
        } else {
            if(!plan) {
                throw new Error("O plano escolhido não existe ou foi tirado do ar.").message
            }
        }       


        await this.userRepo.updatePlan(user,role, plan_id)
    }
    
}