import { getRepository, Repository } from "typeorm";
import { IAdminsRepository } from "../../../Admins/repositories/IAdminsRepository";
import { Articles } from "../../entity/Articles";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../IArticlesRepository";


class ArticleRepository implements IArticlesRepository {
    private repository: Repository<Articles>

    constructor() {
        this.repository = getRepository(Articles)
    }
    async update(
        id: string,
        title?: string,
        description?: string,
        content?: string,
        tags?: string[],
        subjects?: string[]
    ): Promise<Articles> {
        const post = await this.repository.findOne({id})
        if(title) {
            post.title = title
        }

        if(description) {
            post.description = description
        }

        if(content) {
            post.content = content
        }

        if(tags) {
            post.tags = tags
        }

        if(subjects) {
            post.subjects= subjects
        }

        await this.repository.save(post)

        return post

    }
    updateStatus(admin: string, post: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findPostByParams(type_id: string, status_id?: string, author_id?: string): Promise<Articles[]> {
        const postQuery = this.repository.createQueryBuilder("p").where("p.type = :type", {type: type_id})

        if(status_id){
            postQuery.andWhere("p.status = :status_id", { status_id})
        }

        if(author_id) {
            postQuery.andWhere("p.admin = :author_id", {author_id})
        }

        const posts = postQuery.getMany()
        return posts
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