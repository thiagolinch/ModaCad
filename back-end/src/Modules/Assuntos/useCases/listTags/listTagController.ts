import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTagUseCase } from "./listTagUseCase";


class ListTagController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listTagUseCase =  container.resolve(ListTagUseCase)

        try {
            const tags = await listTagUseCase.execute()
            return response.status(201).json(tags)
        } catch (error) {
            return response.status(400).json(error)
        }

    }
}

export { ListTagController }