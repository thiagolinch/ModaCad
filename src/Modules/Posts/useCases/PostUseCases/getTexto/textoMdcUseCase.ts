import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";
import { validate as isUUID } from 'uuid';

@injectable()
class TextoModacadUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository
    ) {}

    async execute( identifier: string ): Promise<Articles> {

        if(isUUID(identifier)) {
            const post = await this.articleRepo.findById(identifier);
            const data = await this.articleRepo.findByPostId(post.post_id);
            
            return data;
        } else {
            const data = await this.articleRepo.findByCanonicalUrl(identifier);

            if (!data) {
                const alternativeUrl = `${identifier}/`;

                const post = await this.articleRepo.findByCanonicalUrl(alternativeUrl);

                if (!post) {
                    throw new Error('Post não encontrado');
                }

                return post;
            }
            
            return data;
        }
    }
}

export { TextoModacadUseCase }