import { ArticleImage } from "../entity/ArticleImage";

interface IArticleImageRepository {
    create(image_name: string, image_url: string, folder: string, article_id?:string ): Promise<ArticleImage>;
    findByIds(image_name: string): Promise<ArticleImage[]>;
    findById(post_id: string): Promise<ArticleImage>;
    findbyName(image_name: string): Promise<ArticleImage>;
    delete(image_name: string): Promise<void>;
}

export { IArticleImageRepository }