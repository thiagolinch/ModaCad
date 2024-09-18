import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";

interface IResponse {
    title: string;
    featured_image: string,
    description: string;
    visibility: string;
    type: string;
    status: string;
    admin: string;
    tags?: string[];
    subjects?: string[],
}

@injectable()
class FilterTextosUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}

    async execute (type_id: string, status_id?: string, author_id?: string): Promise<Articles[]> {
        const texts = await this.articleRepository.findPostByParams(status_id, type_id, author_id)

        return texts;
    }

}

export { FilterTextosUseCase }