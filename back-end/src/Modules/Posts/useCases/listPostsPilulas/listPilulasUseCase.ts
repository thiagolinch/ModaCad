import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";


@injectable()
class ListPilulasUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}

    async execute (status_id: string): Promise<Articles[]> {
        console.log(status_id)
        const pilulas = await this.articleRepository.findPilulasByStatus(status_id)

        return pilulas;
    }

}

export { ListPilulasUseCase }