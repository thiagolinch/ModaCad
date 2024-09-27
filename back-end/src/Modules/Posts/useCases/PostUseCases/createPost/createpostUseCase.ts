import { inject, injectable } from "tsyringe";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";

@injectable()
class CreatePostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}
    async execute ({
        title,
        description,
        content,
        visibility,
        status,
        type,
        admin,
        tags,
        subjects
        }: IArticlesRepositoryDTO): Promise<Articles> {

       
         const post = await this.articleRepository.create({
            title,
            description,
            content,
            visibility,
            status,
            type,
            admin,
            tags,
            subjects
         })

         const blog = await this.articleRepository.findById(post.id)

         return blog
    }
}

export { CreatePostUseCase }
