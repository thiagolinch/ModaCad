import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { IArticleImageRepository } from "../../repository/IArticlesImage";

import { S3StorageProvider } from "../../../../Shared/container/providers/StorageProvider/Implements/S3StorageProvider";

interface IRequest {
    article_id: string;
    image_name: string[];
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

    async execute({image_name, article_id, folder}: IRequest): Promise<void> {
        const articleExists = await this.articleRepo.findById(article_id)
        let now = new Date();
        let year = now.getFullYear();
        let month = `${now.getMonth() +1 }`;
    
        if (month.length === 1) {
          month = `0${month}`;
        }

        const folderDest = `content/images/${year}/${month}/${folder}/`
        

        if(!articleExists) {
            throw new Error("This article does not exists").message
        }

        image_name.map(async (image) => {
            await this.storageProvider.save(image, "images")
            const url  = await this.storageProvider.get(image, folderDest)
            await this.articleImageRepo.create(
                image,
                article_id,
                folderDest.toString()
            );
            
        })
    }

}

export { UploadArticleImageUseCase }