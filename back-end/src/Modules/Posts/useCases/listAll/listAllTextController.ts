import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllTexts } from "./listAllTextUseCase";


class ListAllTextController {
    async handle(request: Request, response: Response): Promise<Response> {
        const type_id = request.query.type
        const status_id = request.query.status
        const author_id = request.query.autor

        const listAllTexts =  container.resolve(ListAllTexts)

        try {
            const subjects = await listAllTexts.execute(status_id.toString(), type_id.toString(), author_id.toString())
            return response.status(201).json(subjects)
        } catch (error) {
            return response.status(400).json({error})
        }

    }
}

export { ListAllTextController }