import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateMemberUseCase } from "./createMemberUseCase";


class CreateMemberController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            password,
            member_ship
        } = request.body;
        const createMemberUseCase = container.resolve(CreateMemberUseCase)

        try {
            const member = await createMemberUseCase.execute({name, email, password, member_ship})
            return response.status(201).json(member)
        } catch (error) {
            return response.json(error)
        }

    }
}   

export { CreateMemberController }