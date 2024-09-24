import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";
import { IArticleImageRepository } from "../../repository/IArticlesImage";
import { S3StorageProvider } from "../../../../Shared/container/providers/StorageProvider/Implements/S3StorageProvider";


@injectable()
class TextoModacadUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository,
        @inject("ArticleImageRepository")
        private articleImageRepo: IArticleImageRepository,

        @inject("StorageProvider")
        private storageProvider: S3StorageProvider
    ) {}

    async execute(id: string): Promise<Articles> {
        const post = await this.articleRepo.findById(id)

        if(post.feature_image) {

            const feature_image = await this.articleImageRepo.findById(post.id)

            if(feature_image) {
                const imageUrl = await this.storageProvider.get(feature_image.image_name, feature_image.folder)
    
                await this.articleRepo.updateFeatureImage(post.id, imageUrl)

                return post
            }
            
        return post
        }

        
        return post
    }
}

export { TextoModacadUseCase }