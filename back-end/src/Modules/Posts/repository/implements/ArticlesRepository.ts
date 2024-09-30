import { getRepository, Repository } from "typeorm";
import { IAdminsRepository } from "../../../Admins/repositories/IAdminsRepository";
import { Articles } from "../../entity/Articles";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../IArticlesRepository";
import { Admins } from "../../../Admins/entity/Admins";


class ArticleRepository implements IArticlesRepository {
    private repository: Repository<Articles>

    constructor() {
        this.repository = getRepository(Articles)
    }

    async updateFeatureImage(id: string, feature_image: string): Promise<void> {
        await this.repository.createQueryBuilder("p")
        .update()
        .set({feature_image})
        .where("id = :id")
        .setParameters({id})
        .execute()
    }

    async deleteFeatureImageController(id: string): Promise<void> {
        const post = await this.repository.findOne({id})

        post.feature_image = null

        await this.repository.save(post)
    }

    async save(data: IArticlesRepositoryDTO): Promise<Articles> {
        const id = data.id
        const post = await this.repository.findOne({id})
        await this.repository.save(post)
        
        return post
    }
    async update(
        id: string,
        title?: string,
        description?: string,
        content?: string,
        status?: string,
        visibility?: string,
        type?: string,
        tags?: string[],
        subjects?: string[],
        images?: string[],
    ): Promise<Articles> {
        const post = await this.repository.findOne({id})

        if(title) {
            post.title = title
        }

        if(status) {
            post.status = status
        }

        if(description) {
            post.description = description
        }

        if(content) {
            post.content = content
        }       

        if(type) {
            post.type = type
        }

        if(visibility) {
            post.visibility = visibility
        }

        if(status) {
            post.status = status
        }

        await this.repository.save(post)

        return post

    }
    updateStatus(admin: string, post: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


    async findPostByParams(type_id: string, status_id?: string, author_id?: string): Promise<Articles[]> {
        const postQuery = this.repository.createQueryBuilder("p")
        .select([
            "p", // Seleciona todos os campos da tabela articles
            "admin.id", // Seleciona apenas o id do admin
            "admin.name", // Seleciona apenas o nome do admin
            "admin.email", // Seleciona apenas o email do admin
            "admin.avatar" // Seleciona apenas o avatar do admin
        ])
        .where("p.type = :type", { type: type_id })
        .leftJoin("p.admins", "admin") // Faz o join com a tabela de admins
        .leftJoinAndSelect("p.tags", "tag") // Inclui todos os dados das tags
        .leftJoinAndSelect("p.subjects", "subjects"); // Inclui todos os dados dos subjects

        
        // Filtro por status, se fornecido
        if (status_id) {
            postQuery.andWhere("p.status = :status_id", { status_id });
        }
    
        // Filtro pelo ID do admin, se fornecido
        if (author_id) {
            postQuery.andWhere("admin.id = :author_id", { author_id });
        }
    
        const posts = await postQuery.getMany();
        return posts;
    }

    async findById(id: string): Promise<Articles | null> {
        //return await this.repository.findOne({ where: { id }, relations: ["tags", "admins", "subjects"] });
        const query = this.repository.createQueryBuilder("p")
        .select([
            "p", // Seleciona todos os campos da tabela articles
            "admin.id", // Seleciona apenas o id do admin
            "admin.name", // Seleciona apenas o nome do admin
            "admin.email", // Seleciona apenas o email do admin
            "admin.avatar" // Seleciona apenas o avatar do admin
        ])
        .where("p.id = :id", {id})
        .leftJoin("p.admins", "admin") // Faz o join com a tabela de admins
        .leftJoinAndSelect("p.tags", "tag") // Inclui todos os dados das tags
        .leftJoinAndSelect("p.subjects", "subjects"); // Inclui todos os dados dos subjects

        const post = query.getOne()

        return post

    }

    
    async findByPostId(post_id: string): Promise<Articles> {
        const query = this.repository.createQueryBuilder("p")
        .select([
            "p", // Seleciona todos os campos da tabela articles
            "admin.id", // Seleciona apenas o id do admin
            "admin.name", // Seleciona apenas o nome do admin
            "admin.email", // Seleciona apenas o email do admin
            "admin.avatar" // Seleciona apenas o avatar do admin
        ])
        .where("p.post_id = :post_id", {post_id})
        .leftJoin("p.admins", "admin") // Faz o join com a tabela de admins
        .leftJoinAndSelect("p.tags", "tag") // Inclui todos os dados das tags
        .leftJoinAndSelect("p.subjects", "subjects"); // Inclui todos os dados dos subjects

        const post = query.getOne()

        return post
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
        tags,
        subjects,
        admins
        }: IArticlesRepositoryDTO): Promise<Articles> {
            const post = this.repository.create({
                title,
                description,
                content,
                visibility,
                status,
                type,
                tags,
                subjects,
                admins
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