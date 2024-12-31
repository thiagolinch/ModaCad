import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateSubjectUseCase } from "./updateAssuntoUseCase";



class UpdateAssuntoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {name, sort} = request.body
        const useCase =  container.resolve(UpdateSubjectUseCase)

        try {
            const tag = await useCase.execute({
                id,
                name,
                sort
            })
            return response.status(201).json(tag)
        } catch (error) {
            return response.status(400).json(error)
        }

    }
}

export { UpdateAssuntoController }