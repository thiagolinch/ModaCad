import { inject, injectable } from "tsyringe";
import { IArticlesRepository, IArticlesRepositoryDTO } from "../../../repository/IArticlesRepository";
import { Articles } from "../../../entity/Articles";
import { ITagsRepository } from "../../../repository/ITagsRepository";
import { ISubjectsRepository } from "../../../../Assuntos/repositories/ISubjectsRepository";
import { IAdminsRepository } from "../../../../Admins/repositories/IAdminsRepository";

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
        private adminRepository: IAdminsRepository
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

        const foundAdmin = await this.adminRepository.findByIds(admins)
        article.admins = foundAdmin

        // 3. Buscar os Subjects no banco de dados
        const foundSubjects = await this.subjectsRepository.findByIds(subjects);
        article.subjects = foundSubjects;

        // 4. Salvar o artigo com os relacionamentos no banco de dados
        const newArticle = await this.articleRepository.create(article);
        
        return newArticle;
    }
}

export { CreatePostUseCase }
