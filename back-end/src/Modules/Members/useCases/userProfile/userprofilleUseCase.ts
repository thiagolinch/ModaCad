import { inject, injectable } from "tsyringe";
import { IMembersRepository } from "../../repositories/IMembersRepository";
import { Members } from "../../entities/Members";

@injectable()
class UserProfileUseCase {
    constructor(
        @inject("MembersRepository")
        private memberRepository: IMembersRepository
    ){}

    async execute(id: string): Promise<Members> {
        const user = await this.memberRepository.findById(id)

        if(!user) {
            throw new Error("This account was not found").message
        };

        return user
    }
}

export { UserProfileUseCase }