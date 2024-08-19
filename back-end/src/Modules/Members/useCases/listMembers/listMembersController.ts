import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMembersUseCase } from "./listMembersUseCase";


class ListMembersController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listUseCase = container.resolve(ListMembersUseCase)

        try {
            const members = await listUseCase.execute()
            return response.status(200).json({members})
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { ListMembersController }