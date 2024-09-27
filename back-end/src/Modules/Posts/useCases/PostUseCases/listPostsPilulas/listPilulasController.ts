import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPilulasUseCase } from "./listPilulasUseCase";


class ListPilulasController {
    async handle(request: Request, response: Response): Promise<Response> {
        const status_id = request.query.status
        const listPilulasUseCase =  container.resolve(ListPilulasUseCase)

        try {
            const pilulas = await listPilulasUseCase.execute(status_id.toString())
            return response.status(200).json(pilulas)
        } catch (error) {
            return response.status(400).json({error})
        }

    }
}

export { ListPilulasController }