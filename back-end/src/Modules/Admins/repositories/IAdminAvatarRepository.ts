import { AdminAvatar } from "../entity/AdminAvatar";


interface IAdminAvatarRepository {
    create(image_name: string, admin_id: string): Promise<AdminAvatar>;
}

export { IAdminAvatarRepository }