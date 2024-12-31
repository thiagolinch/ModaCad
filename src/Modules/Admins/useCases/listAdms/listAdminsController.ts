import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./listAdminsUseCase";


class ListUsersController {

    async handle(request: Request, response: Response): Promise<Response> {
        const status_id = request.query.status as string | undefined;
        const plan_id = request.query.plan as string | undefined;
        const role = request.query.role as string | undefined;

        // Parâmetros de paginação
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;
        const order = request.query.order as "ASC" | "DESC"

        const listAdm = container.resolve(ListUsersUseCase)

        try {
            const admins = await listAdm.execute(
                role,
                status_id,
                plan_id,
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

export { ListUsersController }