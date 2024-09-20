import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { IArticleImageRepository } from "../../repository/IArticlesImage";
import { S3StorageProvider } from "../../../../Shared/container/providers/StorageProvider/Implements/S3StorageProvider";

@injectable()
export class DeleteFeatureImageUseCase {
    constructor(
        @inject("ArticleRepository")
        private postRepo: IArticlesRepository,
        @inject("ArticleImageRepository")
        private imageRepo: IArticleImageRepository,
        @inject("StorageProvider")
        private storageProvider: S3StorageProvider
    ) {}

    async execute(id: string): Promise<void> {
        const post = await this.postRepo.findById(id)

        if(!post) {
            throw new Error("Post não encontrado").message
        }

        if(!post.feature_image) {
            throw new Error("Este post não contem imagem de banner").message
        }

        const image = await this.imageRepo.findById(post.id)
        console.log(image)

        await this.storageProvider.delete(image.image_name, image.folder)

        await this.imageRepo.delete(image.image_name);

        await this.postRepo.deleteFeatureImageController(post.id)
    }
}