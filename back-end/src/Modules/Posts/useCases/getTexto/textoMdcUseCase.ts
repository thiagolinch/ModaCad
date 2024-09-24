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
        
        return post
    }
}

export { TextoModacadUseCase }