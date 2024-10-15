import { Request, Response } from "express";
import { container } from "tsyringe";
import { ViewPlanUseCase } from "./viewPlanUseCase";



export class ViewPlanController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(ViewPlanUseCase)

        try {
            const plan = await useCase.execute(id)
            return res.status(200).json(plan)
        } catch(error) {
            return res.status(404).json( { error })
        }
    }
}