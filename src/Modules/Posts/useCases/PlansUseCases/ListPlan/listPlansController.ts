import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPlansUseCase } from "./listPlansUseCase";



export class ListPlansController {

    async handle(req: Request, res: Response): Promise<Response> {
        const useCase = container.resolve(ListPlansUseCase)

        try {
            const plans = await useCase.execute()
            return res.status(200).json(plans)
        } catch (error) {
            return res.status(404).json({ error })
        }
    }
}