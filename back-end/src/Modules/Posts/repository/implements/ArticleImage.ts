import { getRepository, Repository } from "typeorm";
import { IArticleImageRepository } from "../IArticlesImage";
import { ArticleImage } from "../../entity/ArticleImage";


class ArticleImageRepository implements IArticleImageRepository {
    private repository: Repository<ArticleImage>;

    constructor() {
        this.repository = getRepository(ArticleImage);
    }
    async findById(post_id: string): Promise<ArticleImage[]> {
        const post_images = this.repository.find({article_id: post_id})

        return post_images
    }

    async create( image_name: string, article_id: string, folder: string): Promise<ArticleImage> {
        const articleImage = this.repository.create({
            image_name,
            article_id,
            folder
        })

        await this.repository.save(articleImage)

        return articleImage;
    }

}

export { ArticleImageRepository }