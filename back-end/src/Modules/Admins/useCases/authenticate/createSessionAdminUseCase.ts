import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import auth from "../../../../Config/auth";
import { IDateProvider } from "../../../../Shared/container/providers/DateProvider/IDateProvider";
import { IAdminTokensRepository } from "../../repositories/IAdminTokenRepository";


interface Iresponse {
    admin: {
        name: string;
        subject: string;
        role: string;
    }
    token: string;
}

@injectable()
class CreateSessionAdminUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository,
        @inject("DaysJSDateProvider")
        private dateProvider: IDateProvider,
        @inject("AdminTokenRepository")
        private adminToken: IAdminTokensRepository
    ) {}

    async execute(email: string, password:string): Promise<Iresponse> {
        const admin = await this.adminRepo.findByEmail(email);
        const { expires_in_token, secret, secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;

        if(!admin){
            throw new Error("E-mail or password invalid").message
        }

        const passwordMatch = await compare(password, admin.password)

        if(!passwordMatch){
            throw new Error("E-mail or password invalid").message
        }
        
        const token = sign({
            subject: admin.id,
            role: admin.role.toString,
            expiresIn: expires_in_token
        }, secret)

        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: admin.id,
            expiresIn: expires_in_refresh_token
        });

        await this.adminToken.create({
            admin_id: admin.id,
            expires_date: refresh_token_expires_date,
            refresh_token: refresh_token
        })

        const tokenResponse: Iresponse = {
            admin: {
                name: admin.name,
                subject: admin.id,
                role: admin.role
            },
            token
        }

        return tokenResponse;
    }
}

export { CreateSessionAdminUseCase }