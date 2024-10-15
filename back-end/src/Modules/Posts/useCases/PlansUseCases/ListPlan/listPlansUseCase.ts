import { inject, injectable } from "tsyringe";
import { IPlansRepository } from "../../../repository/IPlansRepository";
import { Plans } from "../../../entity/Plans";


@injectable()
export class ListPlansUseCase {
    constructor(
        @inject("PlanRepository")
        private repository: IPlansRepository
    ) {}

    async execute(): Promise<Plans[]> {
        const plans = await this.repository.list()

        return plans;
    }
}