import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListStafUseCase } from "./listStafUseCase";


class ListStaffController {

    async handle(request: Request, response: Response): Promise<Response> {
        // Parâmetros de paginação
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;
        const order = request.query.order as "ASC" | "DESC"

        const listAdm = container.resolve(ListStafUseCase)

        try {
            const admins = await listAdm.execute(
                page,
                limit, 
                order
            )
            return response.status(200).json(admins)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { ListStaffController }