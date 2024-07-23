import { hash } from "bcryptjs"

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
        password,
        member_ship
    }: IMembersRepositoryDTO): Promise<Members>  {
        const memberExists = await this.memberRepository.findByEmail(email)

        if(memberExists) {
            throw new Error("This email already exists!").message
        }

        const passwordB = await hash(password, 8)


        const member = await this.memberRepository.create({
            name,
            email,
            password: passwordB
        })

        return member
    }
}

export { CreateMemberUseCase }