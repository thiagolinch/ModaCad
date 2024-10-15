import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePlanUseCase } from "./updatePlanUseCase";



export class UpdatePlanController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const {
            title,
            topics,
            price,
            sort
        } = req.body;
        const useCase = container.resolve(UpdatePlanUseCase)

        try {
            await useCase.execute({
                id,
                title,
                topics,
                price,
                sort
            })

            return res.status(200).send()
        } catch (error) {
            return res.status(404).json({ error })
        }
    }
}