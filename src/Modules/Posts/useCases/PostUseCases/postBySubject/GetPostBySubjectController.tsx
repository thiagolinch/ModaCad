import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPostBySubjectUseCase } from "./GetPostBySubjectUseCase";

class FilterTextoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const subject_id = request.query.subjectId as string | undefined;

        // Parâmetros de paginação
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;
        const order = request.query.order as "ASC" | "DESC";

        const useCase = container.resolve(GetPostBySubjectUseCase);

        try {
            const subjects = await useCase.execute(subject_id, page, limit, order)

            return response.status(200).json(subjects);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { FilterTextoController };
