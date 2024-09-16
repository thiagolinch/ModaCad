import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../repository/IArticlesRepository";


@injectable()
class UpdatePostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository
    ){}

    async execute(
        id: string,
        title?: string,
        description?: string,
        content?: string,
        tags?: string[],
        subjects?: string[],
        status?: string
    ): Promise<void> {
        const post = await this.articleRepo.findById(id)

        if(!post) {
            throw new Error("Post dos not exists.").message
        }

        await this.articleRepo.update(
            id,
            title,
            description,
            content,
            tags,
            subjects,
            status
        )
    }
}

export { UpdatePostUseCase }