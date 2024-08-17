import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPilulasUseCase } from "./listPilulasUseCase";


class ListPilulasController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listPilulasUseCase =  container.resolve(ListPilulasUseCase)

        try {
            const pilulas = await listPilulasUseCase.execute()
            return response.status(201).json(pilulas)
        } catch (error) {
            return response.status(400).json({error})
        }

    }
}

export { ListPilulasController }