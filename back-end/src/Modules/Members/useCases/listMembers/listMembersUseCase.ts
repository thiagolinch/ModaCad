import { inject, injectable } from "tsyringe";
import { IMembersRepository } from "../../repositories/IMembersRepository";
import { Members } from "../../entities/Members";

@injectable()
class ListMembersUseCase {
    constructor(
        @inject("MembersRepository")
        private memberRepo: IMembersRepository
    ) {}

    async execute(): Promise<Members[]> {
        const members = this.memberRepo.listAll()

        return members
    }
}

export { ListMembersUseCase }