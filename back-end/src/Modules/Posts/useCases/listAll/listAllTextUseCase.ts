import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";


@injectable()
class ListAllTexts {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}

    async execute (type_id: string, status_id?: string, author_id?: string): Promise<Articles[]> {
        const texts = await this.articleRepository.findPostByParams(status_id, type_id, author_id)

        return texts;
    }

}

export { ListAllTexts }