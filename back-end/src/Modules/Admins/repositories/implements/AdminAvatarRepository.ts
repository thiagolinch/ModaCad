import { getRepository, Repository } from "typeorm";

import { IAdminAvatarRepository } from "../IAdminAvatarRepository";
import { AdminAvatar } from "../../entity/AdminAvatar";


class AdminAvatarRepository implements IAdminAvatarRepository {
    private repository: Repository<AdminAvatar>;

    constructor() {
        this.repository = getRepository(AdminAvatar);
    }

    async create( admin_avatar_name: string, admin_id: string): Promise<AdminAvatar> {
        const adminAvatar = this.repository.create({
            admin_avatar_name,
            admin_id
        })

        await this.repository.save(adminAvatar)

        return adminAvatar;
    }

}

export { AdminAvatarRepository }