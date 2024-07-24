import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileAdminUseCase } from "./profileAdminUseCase";


class ProfileAdminController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.admin
        const profileAdmUseCase = container.resolve(ProfileAdminUseCase)

        try {
            const admin = await profileAdmUseCase.execute(id)
            return response.status(201).json(admin)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}

export { ProfileAdminController }