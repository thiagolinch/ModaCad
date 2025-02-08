import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";

@injectable()
class TextoModacadUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository
    ) {}

    async execute(id: string, isFormated: boolean): Promise<Articles> {
        const postId = await this.articleRepo.findById(id);
        const post_id = postId.post_id;
        console.log(isFormated)

        let data = null;

        const postData = await this.articleRepo.findByPostId(post_id);
    
        const formatedPost = {
            title: postData.title,
            description: postData.description,
            feature_image: postData.feature_image,
            type: postData.type,
            content: postData.content.slice(0, 300) + "...", // Apenas um trecho do conteúdo
            status: postData.status,
            visibility: postData.visibility,
            slug: postData.slug,
            paintext: postData.plaintext,
            mobiledoc: postData.mobiledoc,
            featured: postData.featured,
            cannonicalUrl: postData.canonicalUrl,
            published_at: postData.published_at,
            admins: postData.admins,
            editors: postData.editors,
            curadors: postData.curadors,
            tags: postData.tags,
            subjects: postData.subjects,
            meta: postData.meta
        }

        isFormated === true ? data = formatedPost : data = postData;
        
        return data
    }
}

export { TextoModacadUseCase }