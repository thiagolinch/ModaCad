import { container, inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { IMetaRepository } from "../../../repository/IMetaRepository";
import { ITagsRepository } from "../../../repository/ITagsRepository";
import { ISubjectsRepository } from "../../../../Assuntos/repositories/ISubjectsRepository";
import { IAdminsRepository } from "../../../../Admins/repositories/IAdminsRepository";
import { CanonicalUrlVerify } from "../../../../../Shared/functions/canonicalUrlVerify";

interface IupdateArticleRequest {
    id: string;
    admins?: string[];
    editors?: string[];
    curadors?: string[];
    feature_image?: string;
    title?: string;
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
class UpdatePostUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository,

        @inject("TagsRepository")
        private tagsRepository: ITagsRepository,

        @inject("SubjectRepository")
        private subjectsRepository: ISubjectsRepository,

        @inject("AdminRepository")
        private adminRepository: IAdminsRepository,

        @inject("MetaRepository")
        private metaRepository: IMetaRepository
    ){}

    async execute({
        id,
        admins,
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
        published_at,
        editors,
        curadors
    }: IupdateArticleRequest): Promise<void> {
        const canonicalVerfy = container.resolve(CanonicalUrlVerify);

        const post = await this.articleRepo.findById(id)
        const meta = await this.metaRepository.getbyPostId(post.post_id)

        if(!meta) {
            throw new Error("Meta não encontrada").message
        }

        if(!post) {
            throw new Error("Post dos not exists.")
        }

        const foundTags = await this.tagsRepository.findByIds(tags);
        post.tags = foundTags;
        
        const foundAdmin = await this.adminRepository.findByIds(admins);
        post.admins = foundAdmin;

        const foundEditor = await this.adminRepository.findByIds(editors);
        post.editors = foundEditor;

        const foundCurador = await this.adminRepository.findByIds(curadors);
        post.curadors = foundCurador;

        const foundSubjects = await this.subjectsRepository.findByIds(subjects);
        post.subjects = foundSubjects;

        post.title = title
        post.content = content
        post.description = description
        post.visibility = visibility
        post.type = type
        
        post.canonicalUrl = await canonicalVerfy.defaultCanonicalUrl(canonicalUrl)

        post.published_at = published_at

        post.status = status
        post.feature_image = feature_image

        await this.articleRepo.update(post)
        
        await this.metaRepository.update(
            meta.id,
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
        )
    }
}

export { UpdatePostUseCase }