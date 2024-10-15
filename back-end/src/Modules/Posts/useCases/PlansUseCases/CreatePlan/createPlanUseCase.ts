import { inject, injectable } from "tsyringe";
import { IPlansRepository, IPlansRepositoryDTO } from "../../../repository/IPlansRepository";

@injectable()
export class CreatePlanUseCase {
    constructor(
        @inject("PlanRepository")
        private repository: IPlansRepository
    ) {}

    async execute({
        title,
        topics,
        price,
        sort
    }: IPlansRepositoryDTO): Promise<void> {
        console.log("use Case init")
        console.log(title,
            topics,
            price,
            sort)
        await this.repository.create({
            title,
            topics,
            price,
            sort
        })
        console.log("plano criado")
    }
}