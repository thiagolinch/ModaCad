import { inject, injectable } from "tsyringe";

import { S3StorageProvider } from "../../../../Shared/container/providers/StorageProvider/Implements/S3StorageProvider";
import { IArticleImageRepository } from "../../repository/IArticlesImage";
import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";


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
        private storageProvider: S3StorageProvider,
        @inject("ArticleImageRepository")
        private imageRepo: IArticleImageRepository,
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository
    ){}

    async execute(id: string): Promise<Articles> {
        const image = await this.imageRepo.findById(id);
        const post = await this.articleRepo.findById(id);
        post.images = [];
    
        await Promise.all(image.map(async (i) => {
            const imageUrl = await this.storageProvider.get(i.image_name, i.folder);
            post.images.push(imageUrl);
        }));
    
        await this.articleRepo.update(post.id, post.title, post.description, post.content, post.tags, post.subjects, post.images);
    
        return post;
    }
    
}

export { GetImageUseCase }