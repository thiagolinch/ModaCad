import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteSubjectUseCase } from "./deleteAssuntoUseCase";


class DeleteAssuntoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params
        const deleteTagUseCase = container.resolve(DeleteSubjectUseCase)

        try {
            const tag = await deleteTagUseCase.execute(id)
            return response.status(200).send()
        } catch (error) {
            return response.status(400).json(error)
        }

    }
}

export { DeleteAssuntoController }