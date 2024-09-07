import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateMemberUseCase } from "./createMemberUseCase";


class CreateMemberController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            password,
            plan
        } = request.body
        const createMemberUseCase = container.resolve(CreateMemberUseCase)

        try {
            const member = await createMemberUseCase.execute({name, email, password, plan})
            return response.status(201).json(member)
        } catch (error) {
            return response.json(error)
        }

    }
}   

export { CreateMemberController }