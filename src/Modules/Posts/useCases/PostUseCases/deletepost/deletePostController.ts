import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePostUseCase } from "./deletePostUseCase";


class DeletePostController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const useCase = container.resolve(DeletePostUseCase)

        try {
            await useCase.execute(id)
            return response.status(200).send();
        } catch (error) {
            return response.status(404).json({error});
        }
    }
}

export { DeletePostController }