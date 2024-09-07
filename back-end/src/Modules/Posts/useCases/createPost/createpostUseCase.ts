import { inject, injectable } from "tsyringe";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../../repository/IArticlesRepository";
import { Articles } from "../../entity/Articles";

@injectable()
class CreatePostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository
    ){}
    async execute ({
        title,
        slug,
        html,
        feature_image,
        visibility,
        show_title_and_feature_image,
        status,
        type,
        plaintext,
        admin_id}: IArticlesRepositoryDTO): Promise<Articles> {

       
         const post = await this.articleRepository.create({
            title,
            slug,
            html,
            feature_image,
            visibility,
            show_title_and_feature_image,
            status,
            type,
            plaintext,
            admin_id
         })

         return post
    }
}

export { CreatePostUseCase }
