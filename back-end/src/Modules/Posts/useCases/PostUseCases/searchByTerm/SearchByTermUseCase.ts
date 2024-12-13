import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";

interface IResponse {
    posts: Articles[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}


@injectable()
class searchPostsByTermUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ) {}

    async execute(
        term: string,
        page: number = 1,
        limit: number = 10,
        order: 'DESC' | 'ASC' = 'DESC'
    ): Promise<IResponse> {
        // Adiciona a lógica de paginação, passando `page` e `limit` ao repositório
        const texts = await this.articleRepository.searchPostsByTerm(
            term,
            page,
            limit,
            order
        );
    
        return texts;
    
    }
}

export { searchPostsByTermUseCase };
