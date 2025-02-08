import { inject, injectable } from "tsyringe";
import { IPlansRepository, IPlansRepositoryDTO } from "../../../repository/IPlansRepository";

interface IUpdatePlanRequest {
    id: string,
    title: string,
    topics: string[],
    price: number,
    sort: number,
    description: string,
    frequency: number,
    frequency_type: string
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
        sort,
        description,
        frequency,
        frequency_type
    }: IUpdatePlanRequest): Promise<void> {
        const plan = await this.repository.findById(id)

        plan.title = title;
        plan.topics = topics;
        plan.sort = sort;
        plan.price = price;
        plan.description = description,
        plan.frequency = frequency,
        plan.frequency_type = frequency_type

        await this.repository.update(plan)
        
    }
}