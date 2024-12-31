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
        sort,
        description,
        frequency,
        frequency_type,
        transaction_amount,
        currency_id,
        repetitions
    }: IPlansRepositoryDTO): Promise<void> {

        await this.repository.create({
            title,
            topics,
            price,
            sort,
            description,
            frequency,
            frequency_type,
            transaction_amount,
            currency_id,
            repetitions
        })
    }
}