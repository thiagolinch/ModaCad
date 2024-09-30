import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { ISubjectsRepository } from "../../../../Assuntos/repositories/ISubjectsRepository";
import { Articles } from "../../../entity/Articles";

interface IRequest {
    post_id: string;
    subject_id: string[]
}

@injectable()
export class CreatePostSubjectUseCase {
    constructor(
        @inject("ArticleRepository")
        private articleRepository: IArticlesRepository,
        @inject("SubjectRepository")
        private subjectsRepo: ISubjectsRepository
    ){}

    async execute({post_id, subject_id}: IRequest): Promise<Articles> {
        const post = await this.articleRepository.findById(post_id)

        if(!post) {
            throw new Error("Post não encontrado.").message
        }

        const subjects = await this.subjectsRepo.findByIds(subject_id)

        post.subjects = subjects

        //await this.articleRepository.create()

        return post
    }
}