import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";


@injectable()
class ListAllTexts {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}

    async execute (status_id: string): Promise<Articles[]> {
        const texts = await this.articleRepository.findTextByStatus(status_id)

        return texts;
    }

}

export { ListAllTexts }