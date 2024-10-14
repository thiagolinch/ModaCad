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

    async save(article: Articles): Promise<Articles> {
        const updatedArticle = await this.repository.save(article);
        return updatedArticle;
    }

    async update({
        id,
        title,
        feature_image,
        description,
        content,
        visibility,
        status,
        type,
        tags,
        subjects,
        admins
        }: IArticlesRepositoryDTO
    ): Promise<Articles> {
        const post = await this.repository.findOne({id})

        if(title) {
            post.title = title
        }

        if(feature_image) {
            post.feature_image = feature_image
        }

        if(status != post.status) {
            // Atualiza a data de publicação se o status for "published"
            if (status === "published") {
                post.published_at = new Date();
                post.status = status
            }
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

        if(tags) {
            post.tags = tags
        }

        if(admins) {
            post.admins = admins
        }

        if(subjects) {
            console.log(subjects)
            post.subjects = subjects
        }

        await this.repository.save(post)

        return post

    }

    async findPostByParams(
        type_id: string,
        page: number = 1,
        limit: number = 10,
        status_id?: string,
        author_id?: string,
        order: 'ASC' | 'DESC' = 'ASC'
    ): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    }> {
        const offset = (page - 1) * limit;
    
        const postQuery = this.repository.createQueryBuilder("p")
            .select([
                "p", // Seleciona todos os campos da tabela articles
                "admin.id", // Seleciona apenas o id do admin
                "admin.name", // Seleciona apenas o nome do admin
                "admin.email", // Seleciona apenas o email do admin
                "admin.avatar", // Seleciona apenas o avatar do admin
                "meta"
            ])
            .where("p.type = :type", { type: type_id })
            .leftJoin("p.admins", "admin")
            .leftJoinAndSelect("p.tags", "tag")
            .leftJoinAndSelect("p.subjects", "subjects")
            .leftJoinAndSelect("p.meta", "meta");
    
        // Filtro por status, se fornecido
        if (status_id) {
            postQuery.andWhere("p.status = :status_id", { status_id });
        }
    
        // Filtro pelo ID do admin, se fornecido
        if (author_id) {
            postQuery.andWhere("admin.id = :author_id", { author_id });
        }
    
        // Adiciona a ordenação usando o valor validado de `order`
        const validOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
        postQuery.orderBy("p.updated_at", validOrder);
    
        // Obtem o número total de registros (antes da paginação)
        const totalItems = await postQuery.getCount();
    
        // Adiciona a paginação
        postQuery.skip(offset).take(limit);
    
        // Obtem os posts paginados
        const posts = await postQuery.getMany();
    
        // Calcula o número total de páginas
        const totalPages = Math.ceil(totalItems / limit);
    
        return {
            posts,
            currentPage: page,
            totalPages,
            totalItems,
            pageSize: limit
        };
    }

    async findById(id: string): Promise<Articles> {
        const query = this.repository.createQueryBuilder("p")
            .select([
                "p", // Seleciona todos os campos de articles
                "admin.id", // Seleciona o id de admin
                "admin.role",
                "admin.name", // Seleciona o nome de admin
                "admin.email", // Seleciona o email de admin
                "admin.avatar", // Seleciona o avatar de admin
                "meta"
            ])
            .where("p.id = :id", { id })
            .leftJoin("p.admins", "admin") // Faz o join com a tabela admins
            .leftJoinAndSelect("p.tags", "tag") // Faz o join com a tabela tags
            .leftJoinAndSelect("p.subjects", "subjects") // Faz o join com a tabela subjects
            .leftJoinAndSelect("p.meta", "meta"); // Faz o join com a tabela de meta
        
        const result = await query.getOne();
    
        if (!result) {
            throw new Error("Article not found");
        }
    
        return result;
    }   
    
    async findByPostId(post_id: string): Promise<Articles> {
        const query = this.repository.createQueryBuilder("p")
        .select([
            "p", // Seleciona todos os campos da tabela articles
            "admin.id", // Seleciona apenas o id do admin
            "admin.role",
            "admin.name", // Seleciona apenas o nome do admin
            "admin.email", // Seleciona apenas o email do admin
            "admin.avatar", // Seleciona apenas o avatar do admin
            "meta",
            "tag",
            "subjects"
        ])
        .where("p.post_id = :post_id", {post_id})
        .leftJoin("p.admins", "admin") // Faz o join com a tabela de admins
        .leftJoinAndSelect("p.tags", "tag") // Inclui todos os dados das tags
        .leftJoinAndSelect("p.subjects", "subjects") // Inclui todos os dados dos subjects
        .leftJoinAndSelect("p.meta", "meta");

        const post = query.getOne()

        return post
    }

    async lastPost(): Promise<Articles> {
        const post = this.repository.createQueryBuilder("p")
        .select([
            "p.id",
            "p.post_id",
            "p.title", // Seleciona todos os campos da tabela articles
            "p.description",
            "p.feature_image"
        ])
        .where("p.published_at IS NOT NULL") // Garante que só considere posts publicados
        .andWhere("p.type = :type", { type: "texto"})
        .andWhere("p.status = :status", { status: "published"})
        .orderBy("p.published_at", "DESC") // Ordena pelos mais recentes publicados
        .leftJoinAndSelect("p.tags", "tag")
        .leftJoinAndSelect("p.subjects", "subjects")
        .leftJoinAndSelect("p.meta", "meta")
        .getOne(); // Retorna o último post publicado

        return post;
    }

    async create({
        title,
        feature_image,
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
                feature_image,
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
            const id = post.id

            const data = this.repository.findOne({id})

            return data;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }

    async findByName(name: string): Promise<Articles> {
        return await this.repository.findOne({ title: name})
    }

}

export { ArticleRepository }