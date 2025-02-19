import { Articles } from "../../../entity/Articles";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
    posts: Articles[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}
@injectable()
export class MaisLidosUseCase {
    constructor(
        @inject("ArticleRepository")
        private postRepo: IArticlesRepository
    ) {}

    async execute(
        ids: string[],
        page: number = 1,
        limit: number = 10,
        order: 'DESC' | 'ASC' = 'DESC'
    ): Promise<IResponse> {
        const data = await this.postRepo.maisLidos({
            page,
            limit
        }, ids)

        return data;
    }
}