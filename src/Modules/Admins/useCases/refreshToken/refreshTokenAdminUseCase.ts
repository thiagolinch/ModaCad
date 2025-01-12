import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken"


import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { IDateProvider } from "../../../../Shared/container/providers/DateProvider/IDateProvider";
import { IAdminTokensRepository } from "../../repositories/IAdminTokenRepository";
import auth from "../../../../Config/auth";

interface IPayload {
    sub: string;
    email: string;
};

interface ITokenResponse {
    token: string;
    refresh_token: string ;
}

@injectable()
class RefreshTokenAdminUseCase {
    constructor(
        @inject("AdminTokenRepository")
        private adminsTokenRep: IAdminTokensRepository,
        @inject("AdminRepository")
        private adminRepository: IAdminsRepository,
        @inject("DaysJSDateProvider")
        private dateProvider: IDateProvider
    ){}


    async execute(token: string): Promise<ITokenResponse> {
        const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload;
        const admin_id = sub

        const adminTokens = await this.adminsTokenRep.findByAdminIdAndRefreshToken(
            admin_id,
            token
        )

        if(!adminTokens){
            throw new Error("Refresh token does not exists!").message
        }

        await this.adminsTokenRep.deleteById(adminTokens.id)

        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

        const admin = await this.adminRepository.findById(admin_id)

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: admin.id,
            expiresIn: auth.expires_in_refresh_token     
        })

        await this.adminsTokenRep.create({
            admin_id,
            expires_date,
            refresh_token
        });


        const newToken = sign({}, auth.secret,{
            subject: admin_id,
            expiresIn: auth.expires_in_token
        });

        return {
            token: newToken,
            refresh_token
        };
    }
}

export { RefreshTokenAdminUseCase }