import { IArticlesRepository } from "../../Modules/Posts/repository/IArticlesRepository";
import slugify from "slugify";
import { injectable, inject } from "tsyringe";
@injectable()
export class CanonicalUrlVerify {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository,
    ) {}

    async defaultCanonicalUrl(title: string | null): Promise<string> {
        const baseSlug = title
          ? slugify(title, { lower: true, strict: true })
          : "sem-canonical";
    
        let candidate = baseSlug;
        let count = 1;
    
        while (await this.articleRepository.findByCanonicalUrl(candidate)) {
          count += 1;
          candidate = `${baseSlug}-${count}`;
        }
    
        return candidate;
    }
}