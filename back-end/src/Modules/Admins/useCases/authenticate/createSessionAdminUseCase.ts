import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";


interface Iresponse {
    admin: {
        name: string;
        id: string;
        role: string
    }
    token: string;
}

@injectable()
class CreateSessionAdminUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(email: string, password:string): Promise<Iresponse> {
        const admin = await this.adminRepo.findByEmail(email)

        if(!admin){
            throw new Error("E-mail or password invalid").message
        }

        const passwordMatch = await compare(password, admin.password)

        if(!passwordMatch){
            throw new Error("E-mail or password invalid").message
        }

        const token = sign({}, "88f1c14bd2a14b42fad21d64739889e9", {
            subject: admin.id,
            expiresIn: "1d"
        })

        const tokenResponse: Iresponse = {
            admin: {
                name: admin.name,
                id: admin.id,
                role: admin.role
            },
            token
        }

        return tokenResponse;
    }
}

export { CreateSessionAdminUseCase }