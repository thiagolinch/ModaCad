import { inject, injectable } from "tsyringe";

import { S3StorageProvider } from "../../../../Shared/container/providers/StorageProvider/Implements/S3StorageProvider";


interface IRequest {
    image_name: string;
};

interface IResponse {
    url: string
}

@injectable()
class GetImageUseCase {
    constructor(
        @inject("StorageProvider")
        private storageProvider: S3StorageProvider
    ){}

    async execute(image_name: string): Promise<string> {
        const ulr = await this.storageProvider.get(image_name)

        return ulr
    }
}

export { GetImageUseCase }