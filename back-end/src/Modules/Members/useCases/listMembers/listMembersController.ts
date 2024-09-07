import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMembersUseCase } from "./listMembersUseCase";


class ListMembersController {

    async handle(request: Request, response: Response): Promise<Response> {
        const status_id = request.query.status
        const plan_id = request.query.plan
        
        const listUseCase = container.resolve(ListMembersUseCase)

        try {
            const members = await listUseCase.execute(status_id.toString(), plan_id.toString())
            return response.status(200).json(members)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { ListMembersController }