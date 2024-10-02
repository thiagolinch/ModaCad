import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { IMetaRepository } from "../../../repository/IMetaRepository";
import { ITagsRepository } from "../../../repository/ITagsRepository";
import { ISubjectsRepository } from "../../../../Assuntos/repositories/ISubjectsRepository";
import { IAdminsRepository } from "../../../../Admins/repositories/IAdminsRepository";


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

    async execute(
        id: string,
        admins: string[],
        title: string,
        description: string,
        content: string,
        visibility: string,
        status: string,
        type: string,
        tags: string[], // Array com os IDs ou nomes das tags
        subjects: string[], // Array com os IDs ou nomes dos subjects
        og_image?: string,
        og_title?: string,
        og_description?: string,
        twitter_image?: string,
        twitter_title?: string,
        twitter_description?: string,
        meta_title?: string,
        meta_description?: string,
        email_subject?: string,
        frontmatter?: string,
        feature_image_alt?: string,
        feature_image_caption?: string,
        email_only?: string,
    ): Promise<void> {
        const post = await this.articleRepo.findById(id)
        const meta_id = post.meta_id

        if(!post) {
            throw new Error("Post dos not exists.").message
        }

        const foundTags = await this.tagsRepository.findByIds(tags);
        post.tags = foundTags;

        // 3. Buscar os Admins no banco de dados
        const foundAdmin = await this.adminRepository.findByIds(admins);
        post.admins = foundAdmin;

        // 4. Buscar os Subjects no banco de dados
        const foundSubjects = await this.subjectsRepository.findByIds(subjects);
        post.subjects = foundSubjects;

        await this.articleRepo.update(
            id,
            title,
            description,
            content,
            status,
            visibility,
            type
        )

        await this.metaRepository.update(
            meta_id,
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