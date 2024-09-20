import { inject, injectable } from "tsyringe";

import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { IStorageProvider } from "../../../../Shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    admin_id: string;
    admin_avatar_file: string;
}

@injectable()
class UploadAdminAvatarUseCase {
    constructor(
        @inject("AdminRepository")
        private adminsRepository: IAdminsRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ){}

    async execute({admin_id, admin_avatar_file}: IRequest): Promise<void> {
        const admin = await this.adminsRepository.findById(admin_id);

        let now = new Date();
        let month = `${now.getMonth() +1 }`;
    
        if (month.length === 1) {
          month = `0${month}`;
        }

        // if(admin.avatar){
        //     await this.storageProvider.deleteAvatar(admin.avatar, "avatar")
        // }

        const image = await this.storageProvider.saveAvatar(admin_avatar_file, "avatar");
        
        const avatarUrl = await this.storageProvider.get(image, `content/images/avatar/`)

        admin.avatar = avatarUrl;

        await this.adminsRepository.updateAvatar(admin);
    }
};

export { UploadAdminAvatarUseCase }