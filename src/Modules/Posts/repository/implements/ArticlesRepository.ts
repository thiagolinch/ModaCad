import { Brackets, getRepository, Repository } from "typeorm";
import { Articles } from "../../entity/Articles";
import { FindPostParamsDTO, IArticlesRepository, IArticlesRepositoryDTO } from "../IArticlesRepository";


class ArticleRepository implements IArticlesRepository {
    private repository: Repository<Articles>

    constructor() {
        this.repository = getRepository(Articles)
    }

    postBySubject(params: FindPostParamsDTO): Promise<{ posts: Articles[]; currentPage: number; totalPages: number; totalItems: number; pageSize: number; }> {
        throw new Error("Method not implemented.");
    }

    async searchPostsByTerm(
        term: string,
        page = 1,
        limit = 10,
        order: 'ASC' | 'DESC' = 'DESC'
    ): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    }> {
        const validOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
        const offset = (page - 1) * limit;
    
        const query = this.repository
            .createQueryBuilder("p")
            .select([
                "p.id",
                "p.title",
                "p.published_at",
                "p.status",
                "p.type"
            ])
            .leftJoin("p.admins", "admin")
            .leftJoin("p.tags", "tag")
            .leftJoin("p.subjects", "subjects")
            .where("p.status = :status", { status: "published" })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("p.title ILIKE :term", { term: `%${term}%` })
                        .orWhere("unaccent(p.description) ILIKE unaccent(:term)", { term: `%${term}%` })
                        .orWhere("unaccent(p.content) ILIKE unaccent(:term)", { term: `%${term}%` })
                        .orWhere("unaccent(tag.name) ILIKE unaccent(:term)", { term: `%${term}%` })
                        .orWhere("unaccent(subjects.name) ILIKE unaccent(:term)", { term: `%${term}%` })
                })
            )
            .orderBy("p.published_at", validOrder);
    
        const totalItems = await query.getCount();
        const posts = await query.skip(offset).take(limit).getMany();
    
        return {
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems,
            pageSize: limit,
        };
    }

    async findByCanonicalUrl(canonicalUrl: string): Promise<Articles> {
        const query = this.repository.createQueryBuilder("p")
        .select([
            "p",
            "admin.id",
            "admin.role",
            "admin.name",
            "admin.email",
            "admin.avatar",
            "editors.id",
            "editors.role",
            "editors.name",
            "curators.id",
            "curators.role",
            "curators.name",
            "meta.id",
            "meta.meta_title"
        ])
        .where("p.canonicalUrl = :canonicalUrl", { canonicalUrl })
        .leftJoinAndSelect("p.admins", "admin") // Relação com post_admin
        .leftJoinAndSelect("p.editors", "editors") // Relação com post_editor
        .leftJoinAndSelect("p.curadors", "curators") // Relação com post_curador
        .leftJoinAndSelect("p.tags", "tag")
        .leftJoinAndSelect("p.subjects", "subjects")
        .leftJoinAndSelect("p.meta", "meta");

        const result = await query.getOne();

        if (!result) {
            throw new Error("Article not found");
        }

        return result;
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
        admins,
        canonicalUrl,
        published_at,
        editors,
        curadors
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
            post.subjects = subjects
        }

        if(canonicalUrl) {
            post.canonicalUrl = canonicalUrl
        }

        if(published_at) {
            post.published_at = published_at
        }

        if(editors) {
            post.editors = editors
        }

        if(curadors) {
            post.curadors = curadors
        }

        await this.repository.save(post)

        return post

    }

    async findPostByParams(params: FindPostParamsDTO): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    }> {
        const offset = (params.page - 1) * params.limit;

        const postQuery = this.repository.createQueryBuilder("p")
            .select([
                "p.id",
                "p.post_id",
                "p.title",
                "p.description",
                "p.feature_image",
                "p.status",
                "p.type",
                "p.visibility",
                "p.published_at",
                "admin.id", // Seleciona apenas o id do admin
                "admin.name", // Seleciona apenas o nome do admin
                "admin.role",
                "tag.id",
                "tag.name",
                "subjects",
                "meta"
            ])
            .where("p.type = :type", { type: params.type_id })
            .leftJoin("p.admins", "admin")
            .leftJoin("p.tags", "tag")
            .leftJoin("p.subjects", "subjects")
            .leftJoin("p.meta", "meta");

        // Filtro por status, se fornecido
        if (params.status_id) {
            postQuery.andWhere("p.status = :status_id", { status_id: params.status_id });
        }

        // Filtro pelo ID do admin, se fornecido
        if (params.author_id) {
            postQuery.andWhere("admin.id = :author_id", { author_id: params.author_id });
        }

        if (params.visibility) {
            postQuery.andWhere("p.visibility = :visibility", { visibility: params.visibility })
        }

        if(params.subject_id) {
            postQuery.andWhere("subjects.id = :subject_id", {subject_id: params.subject_id})
        }
        // Obtem o número total de registros (antes da paginação)
        const totalItems = await postQuery.getCount();

        // Adiciona a ordenação usando o valor validado de `order`
        const validOrder = params.order.toUpperCase() === "ASC" ? "ASC" : "DESC";
        console.log("validOrder: ", validOrder)
        postQuery.orderBy("p.published_at", validOrder);

        // Adiciona a paginação
        postQuery.skip(offset).take(params.limit);

        // Obtem os posts paginados
        const posts = await postQuery.getMany();

        // Calcula o número total de páginas
        const totalPages = Math.ceil(totalItems / params.limit);

        return {
            posts,
            currentPage: params.page,
            totalPages,
            totalItems,
            pageSize: params.limit
        };
    }

    async findById(id: string): Promise<Articles> {
        const query = this.repository.createQueryBuilder("p")
        .select([
            "p",
            "admin.id",
            "admin.role",
            "admin.name",
            "admin.email",
            "admin.avatar",
            "editors.id",
            "editors.role",
            "editors.name",
            "curators.id",
            "curators.role",
            "curators.name",
            "meta.id",
            "meta.meta_title"
        ])
        .where("p.id = :id", { id })
        .leftJoinAndSelect("p.admins", "admin") // Relação com post_admin
        .leftJoinAndSelect("p.editors", "editors") // Relação com post_editor
        .leftJoinAndSelect("p.curadors", "curators") // Relação com post_curador
        .leftJoinAndSelect("p.tags", "tag")
        .leftJoinAndSelect("p.subjects", "subjects")
        .leftJoinAndSelect("p.meta", "meta");

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
            "editor.id",
            "editor.name",
            "editor.avatar",
            "curador.id",
            "curador.name",
            "curador.avatar",
            "meta.id",
            "meta.meta_title",
            "tag",
            "subjects"
        ])
        .where("p.post_id = :post_id", {post_id})
        .leftJoin("p.admins", "admin") // Faz o join com a tabela de admins
        .leftJoin("p.editors", "editor")
        .leftJoin("p.curadors", "curador")
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
        admins,
        canonicalUrl,
        published_at,
        editors,
        curadors
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
                admins,
                canonicalUrl,
                published_at,
                editors,
                curadors
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