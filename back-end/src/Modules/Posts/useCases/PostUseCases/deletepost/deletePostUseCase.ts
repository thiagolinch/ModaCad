import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";


@injectable()
class DeletePostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository
    ) {}

    async execute(id: string): Promise<void> {
        const articleExist = await this.articleRepo.findById(id)

        if(!articleExist) {
            throw new Error("This article does not exist.").message
        }

        await this.articleRepo.delete(id);
    }
}

export { DeletePostUseCase }