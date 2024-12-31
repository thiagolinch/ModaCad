import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./updateUserUseCase";


class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params
        const {
            name,
            cellphone,
            email,
            role,
            status_id,
            plan_id
        } = request.body;
        const updateUC = container.resolve(UpdateUserUseCase)

        try {
            await updateUC.execute(
                id,
                name,
                cellphone,
                email,
                role,
                status_id,
                plan_id
            )
            return response.status(200).send()
        } catch (error) {
            return response.status(404).json({error})
        }
    }
}

export { UpdateUserController }