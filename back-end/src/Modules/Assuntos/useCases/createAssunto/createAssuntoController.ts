import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSubjectUseCase } from "./createAssuntoUseCase";


class CreateAssuntoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {name} = request.body
        const createSubjectUseCase =  container.resolve(CreateSubjectUseCase)

        try {
            const tag = await createSubjectUseCase.execute({
                name
            })
            return response.status(201).json(tag)
        } catch (error) {
            return response.status(400).json(error)
        }

    }
}

export { CreateAssuntoController }