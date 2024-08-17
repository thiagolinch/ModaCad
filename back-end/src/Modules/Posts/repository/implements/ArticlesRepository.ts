import { getRepository, Repository } from "typeorm";
import { IAdminsRepository } from "../../../Admins/repositories/IAdminsRepository";
import { Articles } from "../../entity/Articles";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../IArticlesRepository";


class ArticleRepository implements IArticlesRepository {
    private repository: Repository<Articles>

    constructor() {
        this.repository = getRepository(Articles)
    }
    async listPilulas(): Promise<Articles[]> {
        const pilulas = await this.repository.find({type: "Pilulas"})

        return pilulas
    }
    async listTextos(): Promise<Articles[]> {
        return await this.repository.find({type: "Textos"})
    }

    async create({
        title,
        slug,
        subjects_id,
        html,
        feature_image,
        visibility,
        show_title_and_feature_image,
        status,
        type,
        plaintext,
        admin_id,
        comments_id }: IArticlesRepositoryDTO): Promise<Articles> {
            const post = this.repository.create({
                title,
                slug,
                subjects_id,
                html,
                feature_image,
                visibility,
                show_title_and_feature_image,
                status,
                type,
                plaintext,
                admin_id,
                comments_id
            })

            await this.repository.save(post)

            return post
    }
    async list(): Promise<Articles[]> {
        return await this.repository.find()
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<Articles> {
        throw new Error("Method not implemented.");
    }
    
}

export { ArticleRepository }