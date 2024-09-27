import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";


@injectable()
class ListPilulasUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}

    async execute (status_id: string): Promise<Articles[]> {
        const pilulas = await this.articleRepository.findPostByParams(status_id)

        return pilulas;
    }

}

export { ListPilulasUseCase }