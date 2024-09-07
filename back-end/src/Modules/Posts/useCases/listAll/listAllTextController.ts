import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllTexts } from "./listAllTextUseCase";


class ListAllTextController {
    async handle(request: Request, response: Response): Promise<Response> {
        const status_id = request.query.status
        console.log(status_id)
        const listAllTexts =  container.resolve(ListAllTexts)

        try {
            const subjects = await listAllTexts.execute(status_id.toString())
            return response.status(201).json(subjects)
        } catch (error) {
            return response.status(400).json({error})
        }

    }
}

export { ListAllTextController }