import { inject, injectable } from "tsyringe";
import { IPlansRepository, IPlansRepositoryDTO } from "../../../repository/IPlansRepository";

interface IUpdatePlanRequest {
    id: string,
    title: string,
    topics: string[],
    price: string,
    sort: number
}

@injectable()
export class UpdatePlanUseCase {
    constructor(
        @inject("PlanRepository")
        private repository: IPlansRepository
    ) {}

    async execute({
        id,
        title,
        topics,
        price,
        sort
    }: IUpdatePlanRequest): Promise<void> {
        const plan = await this.repository.findById(id)

        plan.title = title;
        plan.topics = topics;
        plan.sort = sort;
        plan.price = price;

        await this.repository.update(plan)
        
    }
}