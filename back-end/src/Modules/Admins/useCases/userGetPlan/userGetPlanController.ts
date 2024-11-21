import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserGetPlanUseCase } from "./userGetPlanUseCase";


export class UserGetPlanController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.admin;
        const { plan_id } = req.body;

        const useCase = container.resolve(UserGetPlanUseCase)

        try {
            await useCase.execute(id, plan_id)
            return res.status(200).send()
        } catch (error) {
            return res.status(400).json(`message: ${error}`)
        }
    }
}