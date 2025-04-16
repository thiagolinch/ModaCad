import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPostByTitleUseCase } from "./getPostByTitleUseCase";

class GetPostByTitleController {

    async handle(request: Request, response: Response): Promise<Response> {
        const title = request.query.title as string | undefined;

        // Parâmetros de paginação
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;
        const order = request.query.order as "ASC" | "DESC"

        const useCase = container.resolve(GetPostByTitleUseCase);

        try {
            const data = await useCase.execute(title, page, limit);

            return response.status(200).json(data);
        } catch (error) {
            return response.status(404).json(error);
        };
    };
};

export { GetPostByTitleController };