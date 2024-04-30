import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteTagUseCase } from "./deleteTagUseCase";


class DeleteTagController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {name} = request.body
        const deleteTagUseCase = container.resolve(DeleteTagUseCase)

        try {
            const tag = await deleteTagUseCase.execute({
                name
            })
            return response.status(200).send()
        } catch (error) {
            return response.status(400).json(error)
        }

    }
}

export { DeleteTagController }