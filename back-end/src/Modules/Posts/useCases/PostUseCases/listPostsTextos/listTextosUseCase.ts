import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";


@injectable()
class ListTextosUseCase {
constructor(
    @inject("ArticleRepository")
    private articleRepo: IArticlesRepository
) {}

async execute(): Promise<Articles[]> {
    return await this.articleRepo.listTextos()
}

}

export { ListTextosUseCase }