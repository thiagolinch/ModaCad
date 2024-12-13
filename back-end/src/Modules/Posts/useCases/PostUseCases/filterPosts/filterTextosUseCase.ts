import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";
import { Tags } from "../../../entity/Tags";
import { Subjects } from "../../../../Assuntos/entities/Subject";
import { Admins } from "../../../../Admins/entity/Admins";

interface IResponse {
    posts: Articles[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}


@injectable()
class FilterTextosUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ) {}

    async execute(
        type_id: string,
        status_id?: string,
        subject_id?: string,
        author_id?: string,
        visibility?: string,
        page: number = 1,
        limit: number = 10,
        order: 'DESC' | 'ASC' = 'DESC'
    ): Promise<IResponse> {
        // Adiciona a lógica de paginação, passando `page` e `limit` ao repositório
        const texts = await this.articleRepository.findPostByParams({
            type_id,
            page,
            limit,
            status_id,
            subject_id,
            author_id,
            visibility,
            order
        });
    
        return texts;
    
    }
}

export { FilterTextosUseCase };
