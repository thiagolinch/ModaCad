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
    admins?: string[];
    editors?: string[];
    curadors?: string[];
    title?: string;
    feature_image?: string;
    description?: string;
    content?: string;
    visibility?: string;
    status?: string;
    type?: string;
    tags?: string[]; // Array com os IDs ou nomes das tags
    subjects?: string[]; // Array com os IDs ou nomes dos subjects
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
    canonicalUrl?: string;
    published_at?: Date;
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
        curadors,
        editors,
        title,
        feature_image,
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
        canonicalUrl,
        published_at
    }: ICreateArticleRequest): Promise<string> {
       
        // 1. Criar o artigo
        const article = new Articles();
        article.title = title;
        article.feature_image = feature_image;
        article.description = description;
        article.content = content;
        article.visibility = visibility;
        article.status = status;
        article.type = type;

        if(canonicalUrl === '') {
            article.canonicalUrl = ''
        } else {
            const cannonical = process.env.FRONT_URL +"/"+ canonicalUrl
            const canonicalExists = await this.articleRepository.findByCanonicalUrl(cannonical)

            if(canonicalExists) {
                console.log("canonical url ja existe, escolha outra")
                throw new Error("Canonical Url ja existe, escolha outra").message
            }
            article.canonicalUrl = cannonical
        }

        article.published_at = published_at

        // 2. Buscar as Tags no banco de dados
        const foundTags = await this.tagsRepository.findByIds(tags);
        article.tags = foundTags;

        // 3. Buscar os Admins no banco de dados
        const foundAdmin = await this.adminRepository.findByIds(admins);
        article.admins = foundAdmin;

        const foundEditor = await this.adminRepository.findByIds(editors);
        article.editors = foundEditor;

        const foundCurador = await this.adminRepository.findByIds(curadors);
        article.curadors = foundCurador;

        // 4. Buscar os Subjects no banco de dados
        const foundSubjects = await this.subjectsRepository.findByIds(subjects);
        article.subjects = foundSubjects;

        const newArticle = await this.articleRepository.create(article);
        const post_id = newArticle.post_id

        await this.metaRepository.create({
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
            email_only
        });

        return newArticle.id;
        
    }
}

export { CreatePostUseCase };
