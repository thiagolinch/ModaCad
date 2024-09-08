import { inject, injectable } from "tsyringe";
import { IMembersRepository } from "../../repositories/IMembersRepository";
import { Members } from "../../entities/Members";

@injectable()
class ListMembersUseCase {
    constructor(
        @inject("MembersRepository")
        private memberRepo: IMembersRepository
    ) {}

    async execute(status_id: string, plan_id: string): Promise<Members[]> {
        const members = await this.memberRepo.list(status_id, plan_id);

        return members;
    }
}

export { ListMembersUseCase }