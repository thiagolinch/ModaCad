import { getRepository, Repository } from "typeorm";

import { IAdminTokensRepository, ICreateAdminTokenDTO } from "../IAdminTokenRepository";
import { AdminTokens } from "../../entity/AdminToken";



class AdminTokenRepository implements IAdminTokensRepository {
    private repository: Repository<AdminTokens>

    constructor(){
        this.repository = getRepository(AdminTokens)
    }


    async create({ admin_id, expires_date, refresh_token }: ICreateAdminTokenDTO): Promise<AdminTokens> {
        const userToken = this.repository.create({
            admin_id,
            expires_date,
            refresh_token
        });

        await this.repository.save(userToken);

        return userToken; 
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete({id})
    }

    async findByAdminIdAndRefreshToken(admin_id: string, refresh_token: string): Promise<AdminTokens> {
        const AdminTokens = await this.repository.findOne({
            admin_id,
            refresh_token
        })
        return AdminTokens
    }

    async findByAdminRefreshToken(refresh_token: string): Promise<AdminTokens> {
        return await this.repository.findOne({refresh_token})
    }

}

export { AdminTokenRepository }