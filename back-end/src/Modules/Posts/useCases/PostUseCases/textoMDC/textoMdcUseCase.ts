import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";


@injectable()
class TextoModacadUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository
    ) {}

    async execute(id: string): Promise<Articles> {
        return await this.articleRepo.findById(id)
    }
}

export { TextoModacadUseCase }