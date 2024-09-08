import { inject } from "tsyringe";
import { IArticlesRepository } from "../../repository/IArticlesRepository";
import { IArticleImageRepository } from "../../repository/IArticlesImage";
import { id } from "aws-sdk/clients/datapipeline";
import { Articles } from "../../entity/Articles";
import { ISubjectsRepository } from "../../../Assuntos/repositories/ISubjectsRepository";

interface IRequest {
    article_id: string,
    subjects_id: string[]
}

class CreateArticleSubjectUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository,
        @inject("SubjectRepository")
        private subjectsRepo: ISubjectsRepository
    ) {}

    async execute({article_id, subjects_id}: IRequest): Promise<Articles> {
        const articleExists = await this.articleRepo.findById(article_id)

        if (!articleExists) {
            throw new Error("This Article does not exists").message
        }

        return articleExists
    }
}

export { CreateArticleSubjectUseCase }