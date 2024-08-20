import { getRepository, Repository } from "typeorm";
import { IArticleImageRepository } from "../IArticlesImage";
import { ArticleImage } from "../../entity/ArticleImage";


class ArticleImageRepository implements IArticleImageRepository {
    private repository: Repository<ArticleImage>;

    constructor() {
        this.repository = getRepository(ArticleImage);
    }

    async create( image_name: string, article_id: string): Promise<ArticleImage> {
        const articleImage = this.repository.create({
            image_name,
            article_id
        })

        await this.repository.save(articleImage)

        return articleImage;
    }

}

export { ArticleImageRepository }