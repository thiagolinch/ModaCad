import { inject, injectable } from "tsyringe";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";
import { ITagsRepository } from "../../../repository/ITagsRepository";
import { ISubjectsRepository } from "../../../../Assuntos/repositories/ISubjectsRepository";
import { IAdminsRepository } from "../../../../Admins/repositories/IAdminsRepository";
import { IMetaRepository } from "../../../repository/IMetaRepository";
import { Meta } from "../../../entity/Meta";
import { Tags } from "../../../entity/Tags";

interface ICreateArticleRequest {
    admins: string[];
    title: string;
    description: string;
    content: string;
    visibility: string;
    status: string;
    type: string;
    tags: string[]; // Array com os IDs ou nomes das tags
    subjects: string[]; // Array com os IDs ou nomes dos subjects
    og_image?: string;
    og_title?: string;
    og_description?: string;
    twitter_image?: string;
    twitter_title?: string;
    twitter_description?: string;
    meta_title?: string;
    meta_description?: string;
    email_subject?: string;
    frontmatter?: string;
    feature_image_alt?: string;
    feature_image_caption?: string;
    email_only?: string;
}

@injectable()
class CreatePostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository,

        @inject("TagsRepository")
        private tagsRepository: ITagsRepository,

        @inject("SubjectRepository")
        private subjectsRepository: ISubjectsRepository,

        @inject("AdminRepository")
        private adminRepository: IAdminsRepository,

        @inject("MetaRepository")
        private metaRepository: IMetaRepository
    ) {}

    async execute({
        admins,
        title,
        description,
        content,
        visibility,
        status,
        type,
        tags,
        subjects,
        og_image,
        og_title,
        og_description,
        twitter_image,
        twitter_title,
        twitter_description,
        meta_title,
        meta_description,
        email_subject,
        frontmatter,
        feature_image_alt,
        feature_image_caption,
        email_only,
    }: ICreateArticleRequest): Promise<Articles> {
       
        // 1. Criar o artigo
        const article = new Articles();
        article.title = title;
        article.description = description;
        article.content = content;
        article.visibility = visibility;
        article.status = status;
        article.type = type;

        // 2. Buscar as Tags no banco de dados
        const foundTags = await this.tagsRepository.findByIds(tags);
        article.tags = foundTags;

        // 3. Buscar os Admins no banco de dados
        const foundAdmin = await this.adminRepository.findByIds(admins);
        article.admins = foundAdmin;

        // 4. Buscar os Subjects no banco de dados
        const foundSubjects = await this.subjectsRepository.findByIds(subjects);
        article.subjects = foundSubjects;
        
        const newArticle = await this.articleRepository.create(article);
        const post_id = newArticle.post_id

        const meta = await this.metaRepository.create({
            post_id, // Relaciona o post_id ao Meta
            og_image,
            og_title,
            og_description,
            twitter_image,
            twitter_title,
            twitter_description,
            meta_title,
            meta_description,
            email_subject,
            frontmatter,
            feature_image_alt,
            feature_image_caption,
            email_only,
        });

        const meta_id = meta.id

        const post = await this.articleRepository.saveMeta(newArticle.id, meta_id)

        return post;
    }
}

export { CreatePostUseCase };
