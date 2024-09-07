import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionAdminUseCase } from "./createSessionAdminUseCase";


class CreateSessionAdminController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const sessionUserUseCase = container.resolve(CreateSessionAdminUseCase)

        try {
            const admin =  await sessionUserUseCase.execute(email, password)
            return response.status(201).json(admin)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { CreateSessionAdminController }