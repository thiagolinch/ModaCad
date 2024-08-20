import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAdminsUseCase } from "./listAdminsUseCase";


class ListAdminsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listAdm = container.resolve(ListAdminsUseCase)

        try {
            const admins = await listAdm.execute()
            return response.status(200).json(admins)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { ListAdminsController }