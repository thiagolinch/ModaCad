import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";


@injectable()
class ListAllTexts {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}

    async execute (): Promise<Articles[]> {
        const texts = await this.articleRepository.list()

        return texts;
    }

}

export { ListAllTexts }