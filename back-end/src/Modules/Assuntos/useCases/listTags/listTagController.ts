import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSubjectsUseCase } from "./listTagUseCase";


class ListTagController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSubjectsUseCase =  container.resolve(ListSubjectsUseCase)

        try {
            const tags = await listSubjectsUseCase.execute()
            return response.status(201).json(tags)
        } catch (error) {
            return response.status(400).json(error)
        }

    }
}

export { ListTagController }