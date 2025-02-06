import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";


@injectable()
class PublicarPostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const post = await this.articleRepo.findById(id);

        if (!post) {
            throw new Error("Post não encontrado");
        }

        post.status = "published";

        await this.articleRepo.update(post);
    }
}