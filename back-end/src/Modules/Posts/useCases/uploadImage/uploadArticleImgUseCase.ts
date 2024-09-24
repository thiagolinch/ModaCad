import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { IArticleImageRepository } from "../../repository/IArticlesImage";

import { S3StorageProvider } from "../../../../Shared/container/providers/StorageProvider/Implements/S3StorageProvider";

interface IRequest {
    image_name: string;
    folder: string;
};

@injectable()
class UploadArticleImageUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository,

        @inject("ArticleImageRepository")
        private articleImageRepo: IArticleImageRepository,

        @inject("StorageProvider")
        private storageProvider: S3StorageProvider
    ){}

    async execute({image_name, folder}: IRequest): Promise<string> {
        const imageExists = await this.articleImageRepo.findbyName(image_name)

        if(imageExists) {
            const image = await this.articleImageRepo.findbyName(image_name)
            
            await this.storageProvider.delete(image.image_name, image.folder)
            await this.articleImageRepo.delete(image.image_name)
        }
        
        let now = new Date();
        let year = now.getFullYear();
        let month = `${now.getMonth() +1 }`;
    
        if (month.length === 1) {
          month = `0${month}`;
        }

        const folderDest = `content/images/${year}/${month}/${folder}/`
        

        await this.storageProvider.save(image_name, "images")
        const url  = await this.storageProvider.get(image_name, folderDest)

        await this.articleImageRepo.create(
            image_name,
            url,
            folderDest.toString()
        );
        
        return url
    }

}

export { UploadArticleImageUseCase }