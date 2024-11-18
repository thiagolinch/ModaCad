import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./listAdminsUseCase";


class ListUsersController {

    async handle(request: Request, response: Response): Promise<Response> {
        const status_id = request.query.status as string | undefined;
        const plan_id = request.query.plan as string | undefined;
        const role = request.query.role as string | undefined;
        const listAdm = container.resolve(ListUsersUseCase)

        try {
            const admins = await listAdm.execute(role.toString(), status_id.toString(), plan_id.toString())
            return response.status(200).json(admins)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { ListUsersController }