import { inject, injectable } from "tsyringe";

import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { IAdminAvatarRepository } from "../../repositories/IAdminAvatarRepository";
import { IStorageProvider } from "../../../../Shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    admin_id: string;
    admin_avatar_name: string[];
}

@injectable()
class UploadAdminAvatarUseCase {
    constructor(
        @inject("AdminRepository")
        private adminsRepository: IAdminsRepository,

        @inject("AdminAvatarRepository")
        private adminAvatarRepository: IAdminAvatarRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ){}

    async execute({admin_avatar_name, admin_id}: IRequest): Promise<void> {
        const carExists = await this.adminsRepository.findById(admin_id)

        if(!carExists) {
            throw new Error("This car does not exists")
        }

        admin_avatar_name.map(async (image) => {
            await this.adminAvatarRepository.create(
                image,
                admin_id
            );
            await this.storageProvider.save(image, "cars")
        })
    }

}

export { UploadAdminAvatarUseCase }