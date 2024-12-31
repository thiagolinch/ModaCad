import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { IArticleImageRepository } from "../../../repository/IArticlesImage";
import { Articles } from "../../../entity/Articles";


@injectable()
export class GetTextoByUrlUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository,
        @inject("ArticleImageRepository")
        private articleImageRepo: IArticleImageRepository
    ) {}

    async execute(url: string): Promise<Articles> {
        const canonicalUrl = process.env.FRONT_URL +"/"+ url

        const data = await this.articleRepo.findByCanonicalUrl(canonicalUrl)
        
        return data
    }
}