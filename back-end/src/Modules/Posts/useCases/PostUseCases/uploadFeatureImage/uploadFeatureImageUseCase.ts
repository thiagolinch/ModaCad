import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { IArticleImageRepository } from "../../../repository/IArticlesImage";

import { S3StorageProvider } from "../../../../../Shared/container/providers/StorageProvider/Implements/S3StorageProvider";

interface IRequest {
    article_id: string;
    image_name: string;
    folder: string;
};

@injectable()
class UploadFeatureImageUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository,

        @inject("ArticleImageRepository")
        private articleImageRepo: IArticleImageRepository,

        @inject("StorageProvider")
        private storageProvider: S3StorageProvider
    ){}

    async execute({image_name, article_id, folder}: IRequest): Promise<string> {
        const articleExists = await this.articleRepo.findById(article_id)

        if(!articleExists) {
            throw new Error("This article does not exists").message
        }

        if(articleExists.feature_image) {   
            const image = await this.articleImageRepo.findById(articleExists.id)

            if(image) {
                await this.storageProvider.delete(image.image_name, image.folder)
                await this.articleImageRepo.delete(image.image_name)
            }
        }

        let now = new Date();
        let year = now.getFullYear();
        let month = `${now.getMonth() +1 }`;
    
        if (month.length === 1) {
          month = `0${month}`;
        }

        // const folderDest = `content/images/${year}/${month}/${folder}/`

        const image_url = await this.storageProvider.save(image_name, "images")

        /* await this.articleImageRepo.create(
            image_name,
            article_id,
            folderDest.toString(),
            image_url
        ) */

        await this.articleRepo.updateFeatureImage(articleExists.id, image_url)

        return image_url;
    }

}

export { UploadFeatureImageUseCase }