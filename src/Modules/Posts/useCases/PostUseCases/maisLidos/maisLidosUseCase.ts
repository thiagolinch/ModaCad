import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class MaisLidosUseCase {
    constructor(
        @inject("ArticleRepository")
        private postRepo: IArticlesRepository
    ) {}

    async execute(ids: string[]) {
        const data = await this.postRepo.maisLidos(ids)

        return data;
    }
}