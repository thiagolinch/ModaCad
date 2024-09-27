import { Request, Response } from "express";
import { container } from "tsyringe";

import { listAssuntoUseCase } from "./listAssuntoUseCase";


class ListAssuntoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSubjectsUseCase =  container.resolve(listAssuntoUseCase)

        try {
            const subjects = await listSubjectsUseCase.execute()
            return response.status(201).json(subjects)
        } catch (error) {
            return response.status(400).json({error})
        }

    }
}

export { ListAssuntoController }