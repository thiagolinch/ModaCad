import { inject, injectable } from "tsyringe";
import { Articles } from "../../../entity/Articles";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";


@injectable()
class ListPostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}

    async execute(): Promise<Articles[]> {
        return await this.articleRepository.list()
    }
}

export { ListPostUseCase }