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

        if(admin.avatar){
            await this.storageProvider.delete(admin.avatar, "avatar");
        }

        await this.storageProvider.save(admin_avatar_file, "avatar");

        admin.avatar = admin_avatar_file;

        await this.adminsRepository.updateAvatar(admin);
    }

};

export { UploadAdminAvatarUseCase }