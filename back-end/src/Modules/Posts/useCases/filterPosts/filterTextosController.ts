import { Request, Response } from "express";
import { container } from "tsyringe";

import { FilterTextosUseCase } from "./filterTextosUseCase";


class FilterTextoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const type_id = request.query.type
        const status_id = request.query.status
        const author_id = request.query.autor

        const filterTextUC =  container.resolve(FilterTextosUseCase)

        try {
            const subjects = await filterTextUC.execute(status_id.toString(), type_id.toString(), author_id.toString())
            return response.status(201).json(subjects)
        } catch (error) {
            return response.status(400).json({error})
        }

    }
}

export { FilterTextoController }