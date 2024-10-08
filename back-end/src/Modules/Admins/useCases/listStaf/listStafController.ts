import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListStafUseCase } from "./listStafUseCase";


class ListStaffController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listAdm = container.resolve(ListStafUseCase)

        try {
            const admins = await listAdm.execute()
            return response.status(200).json(admins)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { ListStaffController }