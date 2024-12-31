import { AdminTokens } from "../entity/AdminToken";

interface ICreateAdminTokenDTO {
    admin_id: string;
    expires_date: Date;
    refresh_token: string;
}

interface IAdminTokensRepository {

    create({admin_id, expires_date, refresh_token}: ICreateAdminTokenDTO): Promise<AdminTokens>;
    deleteById(id: string): Promise<void>;
    findByAdminIdAndRefreshToken(admin_id: string, token: string): Promise<AdminTokens>;
    findByAdminRefreshToken(refresh_token: string): Promise<AdminTokens>;
}

export { IAdminTokensRepository, ICreateAdminTokenDTO }