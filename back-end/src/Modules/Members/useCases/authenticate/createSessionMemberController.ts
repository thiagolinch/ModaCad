import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionMemberUseCase } from "./createSessionAdminUseCase";


class CreateSessionUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const sessionUserUseCase = container.resolve(CreateSessionMemberUseCase)

        try {
            const user =  await sessionUserUseCase.execute(email, password)
            return response.status(201).json(user);
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { CreateSessionUserController }