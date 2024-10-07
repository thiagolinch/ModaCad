import { Request, Response } from "express";
import { container } from "tsyringe";
import { FilterTextosUseCase } from "./filterTextosUseCase";

class FilterTextoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const type_id = request.query.type as string | undefined;
        const status_id = request.query.statusId as string | undefined;
        const author_id = request.query.authorId as string | undefined;

        // Parâmetros de paginação
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;

        const filterTextUC = container.resolve(FilterTextosUseCase);

        try {
            const subjects = await filterTextUC.execute(
                type_id,
                status_id,
                author_id,
                page,
                limit
            );

            return response.status(200).json(subjects);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { FilterTextoController };
