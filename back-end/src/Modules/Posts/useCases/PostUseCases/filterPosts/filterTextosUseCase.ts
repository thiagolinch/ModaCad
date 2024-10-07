import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";
import { Tags } from "../../../entity/Tags";
import { Subjects } from "../../../../Assuntos/entities/Subject";
import { Admins } from "../../../../Admins/entity/Admins";

// interface IResponse {
//     title: string;
//     feature_image: string;
//     description: string;
//     visibility: string;
//     type: string;
//     status: string;
//     admins: Admins[];
//     tags?: Tags[];
//     subjects?: Subjects[];
// }[]

@injectable()
class FilterTextosUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ) {}

    async execute(
        type_id: string,
        status_id?: string,
        author_id?: string,
        page: number = 1,
        limit: number = 10
    ): Promise<Articles[]> {
        // Adiciona a lógica de paginação, passando `page` e `limit` ao repositório
        const texts = await this.articleRepository.findPostByParams(
            type_id,
            page,
            limit,
            status_id,
            author_id
        );
    
        return texts;
    
    }
}

export { FilterTextosUseCase };
