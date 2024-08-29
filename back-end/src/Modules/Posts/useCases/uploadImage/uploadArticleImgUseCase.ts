import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { IArticleImageRepository } from "../../repository/IArticlesImage";
import { S3StorageProvider } from "../../../../Shared/container/providers/StorageProvider/Implements/S3StorageProvider";

interface IRequest {
    article_id: string;
    image_name: string[];
}

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

    async execute({image_name, article_id}: IRequest): Promise<void> {
        const articleExists = await this.articleRepo.findById(article_id)
        

        if(!articleExists) {
            throw new Error("This article does not exists")
        }

        image_name.map(async (image) => {
            await this.articleImageRepo.create(
                image,
                article_id
            );
            await this.storageProvider.save(image, "images")
        })
    }

}

export { UploadArticleImageUseCase }