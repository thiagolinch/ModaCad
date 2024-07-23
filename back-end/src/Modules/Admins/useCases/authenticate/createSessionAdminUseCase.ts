import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";


interface Iresponse {
    user: {
        name: string;
        id: string;
    }
    token: string;
}

@injectable()
class CreateSessionAdminUseCase {
    constructor(
        @inject("AdminsRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(email: string, password:string): Promise<Iresponse> {
        const user = await this.adminRepo.findByEmail(email)

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

export { CreateSessionAdminUseCase }