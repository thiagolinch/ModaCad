import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";
import { validate as isUUID } from 'uuid';

interface IResponse {
    posts: Articles[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}

@injectable()
class GetPostByTitleUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository
    ) {}

    async execute( 
        title: string,
        page: number = 1,
        limit: number = 10
     ): Promise<IResponse> {

        if(!title) {
            throw new Error('title is required');
        } 

        const data = await this.articleRepo.findByName({
            title,
            page,
            limit
        });

        return data;
    }
}

export { GetPostByTitleUseCase }