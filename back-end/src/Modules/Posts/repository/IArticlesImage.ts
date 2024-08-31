import { ArticleImage } from "../entity/ArticleImage";

interface IArticleImageRepository {
    create(image_name: string, article_id: string): Promise<ArticleImage>;
    /* get(image_name: string): Promise<ArticleImage>; */
}

export { IArticleImageRepository }