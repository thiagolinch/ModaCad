import { ArticleImage } from "../entity/ArticleImage";

interface IArticleImageRepository {
    create(image_name: string, article_id: string): Promise<ArticleImage>;
}

export { IArticleImageRepository }