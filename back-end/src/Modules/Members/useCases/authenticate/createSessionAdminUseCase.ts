import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IMembersRepository } from "../../repositories/IMembersRepository";


interface Iresponse {
    user: {
        name: string;
        id: string;
    }
    token: string;
}

@injectable()
class CreateSessionMemberUseCase {
    constructor(
        @inject("MembersRepository")
        private memberRepo: IMembersRepository
    ) {}

    async execute(email: string, password:string): Promise<Iresponse> {
        const user = await this.memberRepo.findByEmail(email)

        if(!user){
            throw new Error("E-mail or password invalid").message
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("E-mail or password invalid").message
        }

        const token = sign({}, "88f1c14bd2a14b42fad21d64739889e9", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenResponse: Iresponse = {
            user: {
                name: user.name,
                id: user.id
            },
            token
        }

        return tokenResponse;
    }
}

export { CreateSessionMemberUseCase }