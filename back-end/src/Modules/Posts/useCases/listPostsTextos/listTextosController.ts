import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTextosUseCase } from "./listTextosUseCase";



class ListTextosController{

    async handle(request: Request, response: Response): Promise<Response> {
        const listTextUseCase = container.resolve(ListTextosUseCase)

        try {
            const textos = await listTextUseCase.execute()
            return response.status(201).json(textos)
        } catch (error) {
            return response.status(404).json({error})
        }
    }
}

export { ListTextosController }