import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserProfileUseCase } from "./userprofilleUseCase";


class UserProfileController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.user
        const userPUseCase = container.resolve(UserProfileUseCase);

        try {
            const user = await userPUseCase.execute(id)
            return response.status(200).json(user)
        } catch (error) {
            return response.status(404).json({error})
        };
    }
}

export { UserProfileController }