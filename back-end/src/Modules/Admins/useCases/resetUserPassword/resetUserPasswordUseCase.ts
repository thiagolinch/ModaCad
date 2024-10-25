import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../Shared/container/providers/DateProvider/IDateProvider";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { AdminTokenRepository } from "../../repositories/implements/AdminTokenRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetUserPasswordUseCase {
    constructor(
        @inject("AdminTokenRepository")
        private usersTokenRep: AdminTokenRepository,
        @inject("DaysJSDateProvider")
        private dayJsProvider: IDateProvider,
        @inject("AdminRepository")
        private userRepository: IAdminsRepository
    ){}

    async execute({token, password}: IRequest): Promise<void> {
        const adminToken = await this.usersTokenRep.findByAdminRefreshToken(token)

        if(!adminToken) {
            throw new Error("Token Invalid")
        }

        if(this.dayJsProvider.compareIfBefore(adminToken.expires_date, this.dayJsProvider.dateNow())) {
            throw new Error("Token expired!")
        }

        const user = await this.userRepository.findById(adminToken.admin_id)

       user.password = await hash(password, 9);

        await this.userRepository.create(user);

        await this.usersTokenRep.deleteById(adminToken.id)
    }
}

export { ResetUserPasswordUseCase } 