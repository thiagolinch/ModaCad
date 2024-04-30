import { inject, injectable } from "tsyringe";
import { IMembersRepository, IMembersRepositoryDTO } from "../../repositories/IMembersRepository";
import { Members } from "../../entities/Members";


@injectable()
class CreateMemberUseCase {
    constructor(
        @inject("MembersRepository")
        private memberRepository: IMembersRepository
    ){}

    async execute({
        name,
        email,
        password
    }: IMembersRepositoryDTO): Promise<Members>  {


        const member = await this.memberRepository.create({
            name,
            email,
            password
        })

        return member
    }
}

export { CreateMemberUseCase }