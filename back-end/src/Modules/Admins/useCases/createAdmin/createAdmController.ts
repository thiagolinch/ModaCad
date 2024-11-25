import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAdmUseCase } from "./createAdmUseCase";


class CreateAdmController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            password,
            cellphone,
            role
        } = request.body;
        const createAdminUseCase = container.resolve(CreateAdmUseCase)

        try {
            const admin = await createAdminUseCase.execute({name, email, password, cellphone, role})
            return response.status(201).json(admin)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

}

export { CreateAdmController }