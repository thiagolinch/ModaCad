import { Request, Response } from "express";
import { container } from "tsyringe";


class PublicarPostController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;

        const useCase = container.resolve(PublicarPostUseCase);

        try {
            const data = await useCase.execute(id)
        } catch (error) {
            return response.status(400).json({ message: error.message });
            
        }
    }
}