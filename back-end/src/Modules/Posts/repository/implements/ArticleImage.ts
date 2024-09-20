import { getRepository, Repository } from "typeorm";
import { IArticleImageRepository } from "../IArticlesImage";
import { ArticleImage } from "../../entity/ArticleImage";


class ArticleImageRepository implements IArticleImageRepository {
    private repository: Repository<ArticleImage>;

    constructor() {
        this.repository = getRepository(ArticleImage);
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
    
    async findById(post_id: string): Promise<ArticleImage> {
        return this.repository.findOne({article_id: post_id})
    }

    async findByIds(post_id: string): Promise<ArticleImage[]> {
        return this.repository.find({article_id: post_id})
    }

    async findbyName(image_name: string): Promise<ArticleImage> {
        return this.repository.findOne({image_name})
    }

    async delete(image_name: string): Promise<void> {
        try {
            // Find the article image by its name
            const articleImageToDelete = await this.repository.findOne({ image_name });
    
            if (!articleImageToDelete) {
                throw new Error(`Article image with name "${image_name}" not found.`);
            }
    
            // Delete the article image
            await this.repository.remove(articleImageToDelete);
        } catch (error) {
            // Handle any errors (e.g., database connection issues, etc.)
            console.error("Error deleting article image:", error.message);
            throw error;
        }
    }

}

export { ArticleImageRepository }