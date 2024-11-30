import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAdmUseCase } from "./createAdmUseCase";


class CreateAdmController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            email,
            role
        } = request.body;
        const createAdminUseCase = container.resolve(CreateAdmUseCase)

        try {
            const admin = await createAdminUseCase.execute({email, role})
            return response.status(201).json(admin)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

}

export { CreateAdmController }