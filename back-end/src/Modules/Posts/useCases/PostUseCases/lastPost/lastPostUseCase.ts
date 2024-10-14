import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";



@injectable()
export class LastPostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository,
    ) {}

    async execute(): Promise<Articles> {
        console.log("last post useCase")
        const post = await this.articleRepository.lastPost()

        return post
    }
}