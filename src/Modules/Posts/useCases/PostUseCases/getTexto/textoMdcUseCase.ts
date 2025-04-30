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
            return post;
        } else {
            const data = await this.articleRepo.findByCanonicalUrl(identifier);

            if (!data) {
                const alternativeUrl = `${identifier}/`;

                const text = await this.articleRepo.findByCanonicalUrl(alternativeUrl);

                if (!text) {
                    throw new Error('Post não encontrado');
                }

                return text;
            }
            
            return data;
        }
    }
}

export { TextoModacadUseCase }