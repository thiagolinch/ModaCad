import { getRepository, Repository } from "typeorm";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../IArticlesRepository";
import { Articles } from "../../entity/Articles";

interface FindPostParams {
    type_id: string;
    page?: number;
    limit?: number;
    status_id?: string;
    subject_id?: string;
    author_id?: string;
    visibility?: string;
    order?: 'ASC' | 'DESC';
}

class ArticleRepository implements IArticlesRepository {
    private repository: Repository<Articles>;

    constructor() {
        this.repository = getRepository(Articles);
    }

    private throwIfNotFound(entity: Articles | undefined, message = "Article not found"): Articles {
        if (!entity) {
            throw new Error(message);
        }
        return entity;
    }

    async findByCanonicalUrl(canonicalUrl: string): Promise<Articles> {
        const article = await this.repository
            .createQueryBuilder("p")
            .select([
                "p",
                "admin.id", "admin.role", "admin.name", "admin.email", "admin.avatar",
                "editors.id", "editors.role", "editors.name",
                "curators.id", "curators.role", "curators.name",
                "meta.id", "meta.meta_title",
            ])
            .where("p.canonicalUrl = :canonicalUrl", { canonicalUrl })
            .leftJoinAndSelect("p.admins", "admin")
            .leftJoinAndSelect("p.editors", "editors")
            .leftJoinAndSelect("p.curadors", "curators")
            .leftJoinAndSelect("p.tags", "tag")
            .leftJoinAndSelect("p.subjects", "subjects")
            .leftJoinAndSelect("p.meta", "meta")
            .getOne();

        return this.throwIfNotFound(article);
    }

    async updateFeatureImage(id: string, feature_image: string): Promise<void> {
        await this.repository.update(id, { feature_image });
    }

    async deleteFeatureImageController(id: string): Promise<void> {
        const post = await this.repository.findOne(id);
        if (!post) throw new Error("Article not found");

        post.feature_image = null;
        await this.repository.save(post);
    }

    async save(article: Articles): Promise<Articles> {
        return await this.repository.save(article);
    }

    async update(data: IArticlesRepositoryDTO): Promise<Articles> {
        const post = await this.repository.findOne(data.id);
        const updatedPost = { ...post, ...data, published_at: data.status === "published" ? new Date() : post?.published_at };

        return this.throwIfNotFound(await this.repository.save(updatedPost));
    }

    async findPostByParams(params: FindPostParams): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    }> {
        const { type_id, page = 1, limit = 10, status_id, subject_id, author_id, visibility, order } = params;
        const validOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
        const offset = (page - 1) * limit;

        const query = this.repository
            .createQueryBuilder("p")
            .select([
                "p.id", "p.post_id", "p.title", "p.description", "p.feature_image", "p.status", "p.visibility", "p.published_at",
                "admin.id", "admin.name", "admin.role",
                "tag.id", "tag.name",
                "subjects", "meta",
            ])
            .where("p.type = :type_id", { type_id })
            .leftJoin("p.admins", "admin")
            .leftJoin("p.tags", "tag")
            .leftJoin("p.subjects", "subjects")
            .leftJoin("p.meta", "meta")
            .orderBy("p.published_at", validOrder);

        if (status_id) query.andWhere("p.status = :status_id", { status_id });
        if (author_id) query.andWhere("admin.id = :author_id", { author_id });
        if (visibility) query.andWhere("p.visibility = :visibility", { visibility });
        if (subject_id) query.andWhere("subjects.id = :subject_id", { subject_id });

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

    async findById(id: string): Promise<Articles> {
        const article = await this.repository
            .createQueryBuilder("p")
            .select([
                "p", "admin.id", "admin.role", "admin.name", "admin.email", "admin.avatar",
                "editors.id", "editors.role", "editors.name",
                "curators.id", "curators.role", "curators.name",
                "meta.id", "meta.meta_title",
            ])
            .where("p.id = :id", { id })
            .leftJoinAndSelect("p.admins", "admin")
            .leftJoinAndSelect("p.editors", "editors")
            .leftJoinAndSelect("p.curadors", "curators")
            .leftJoinAndSelect("p.tags", "tag")
            .leftJoinAndSelect("p.subjects", "subjects")
            .leftJoinAndSelect("p.meta", "meta")
            .getOne();

        return this.throwIfNotFound(article);
    }

    async findByPostId(post_id: string): Promise<Articles> {
        const article = await this.repository
            .createQueryBuilder("p")
            .select([
                "p", "admin.id", "admin.role", "admin.name", "admin.email", "admin.avatar",
                "editor.id", "editor.name", "editor.avatar",
                "curador.id", "curador.name", "curador.avatar",
                "meta.id", "meta.meta_title", "tag", "subjects",
            ])
            .where("p.post_id = :post_id", { post_id })
            .leftJoin("p.admins", "admin")
            .leftJoin("p.editors", "editor")
            .leftJoin("p.curadors", "curador")
            .leftJoinAndSelect("p.tags", "tag")
            .leftJoinAndSelect("p.subjects", "subjects")
            .leftJoinAndSelect("p.meta", "meta")
            .getOne();

        return this.throwIfNotFound(article);
    }

    async lastPost(): Promise<Articles> {
        const post = await this.repository
            .createQueryBuilder("p")
            .select(["p.id", "p.post_id", "p.title", "p.description", "p.feature_image"])
            .where("p.published_at IS NOT NULL")
            .andWhere("p.type = :type", { type: "texto" })
            .andWhere("p.status = :status", { status: "published" })
            .orderBy("p.published_at", "DESC")
            .leftJoinAndSelect("p.tags", "tag")
            .leftJoinAndSelect("p.subjects", "subjects")
            .leftJoinAndSelect("p.meta", "meta")
            .getOne();

        return this.throwIfNotFound(post);
    }

    async create(data: IArticlesRepositoryDTO): Promise<Articles> {
        const post = this.repository.create(data);
        return await this.repository.save(post);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByName(name: string): Promise<Articles> {
        return await this.repository.findOne({ title: name });
    }
}

export { ArticleRepository };
