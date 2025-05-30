import { Request, Response } from "express";
import { searchPostsByTermUseCase } from "./SearchByTermUseCase";
import { container } from "tsyringe";

function removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

class SearchPostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const term = request.query.term as string | undefined;
        
        const normalizer = removeAccents(term)
        // Parâmetros de paginação
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;
        const order = request.query.order as "ASC" | "DESC"

        const search = container.resolve(searchPostsByTermUseCase);

        try {
            const subjects = await search.execute(normalizer, page, limit, order);

            return response.status(200).json(subjects);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { SearchPostController };
