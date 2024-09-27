import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateArticleSubjectUseCase } from "./createArticleSubjectsUseCase";


class CreateArticleSubjectsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {subjects_id} = request.body;
        const useCase = container.resolve(CreateArticleSubjectUseCase);

        try {
            const article = useCase.execute({article_id: id, subjects_id})
            return response.status(201)
        } catch (error) {
            return response.status(400).json({error})
        }
    }
}

export { CreateArticleSubjectsController }