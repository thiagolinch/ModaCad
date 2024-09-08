import { getRepository, Repository } from "typeorm";
import { IAdminsRepository } from "../../../Admins/repositories/IAdminsRepository";
import { Articles } from "../../entity/Articles";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../IArticlesRepository";


class ArticleRepository implements IArticlesRepository {
    private repository: Repository<Articles>

    constructor() {
        this.repository = getRepository(Articles)
    }
    async findTextByStatus(status_id: string): Promise<Articles[]> {
        const texts = await this.repository.find({ status: status_id})
        return texts
    }
    async findPilulasByStatus(status_id: string): Promise<Articles[]> {
        const pilulas = await this.repository.find({ status: status_id })
        return pilulas
    }
    async findById(id: string): Promise<Articles> {
        return await this.repository.findOne({id})
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
        description,
        content,
        visibility,
        status,
        type,
        admin,
        tags,
        subjects
        }: IArticlesRepositoryDTO): Promise<Articles> {
            const post = this.repository.create({
                title,
                description,
                content,
                visibility,
                status,
                type,
                admin,
                tags,
                subjects
            })

            await this.repository.save(post)

            return post
    }
    async list(): Promise<Articles[]> {
        return await this.repository.find()
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }
    findByName(name: string): Promise<Articles> {
        throw new Error("Method not implemented.");
    }
    
}

export { ArticleRepository }