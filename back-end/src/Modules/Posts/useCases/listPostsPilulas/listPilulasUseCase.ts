import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";


@injectable()
class ListPilulasUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}

    async execute (): Promise<Articles[]> {
        const pilulas = await this.articleRepository.listPilulas()

        return pilulas;
    }

}

export { ListPilulasUseCase }