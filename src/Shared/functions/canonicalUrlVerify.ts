import { IArticlesRepository } from "../../Modules/Posts/repository/IArticlesRepository";
import slugify from "slugify";
import { injectable, inject } from "tsyringe";
@injectable()
export class CanonicalUrlVerify {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository,
    ) {}

    async defaultCanonicalUrl(text: string | null, currentCanonicalUrl?: string): Promise<string> {
      const baseSlug = text
        ? slugify(text, { lower: true, strict: true })
        : "sem-canonical";
  
      let candidate = baseSlug;
      let count = 1;

      if (currentCanonicalUrl && candidate === currentCanonicalUrl) {
        return currentCanonicalUrl
      }
  
      while (await this.articleRepository.findByCanonicalUrl(candidate)) {
        count += 1;
        candidate = `${baseSlug}-${count}`;
      }
  
      return candidate;
    }
}