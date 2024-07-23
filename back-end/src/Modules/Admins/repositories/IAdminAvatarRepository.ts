import { AdminAvatar } from "../entity/AdminAvatar";


interface IAdminAvatarRepository {
    create(image_name: string, car_id: string): Promise<AdminAvatar>;
}

export { IAdminAvatarRepository }