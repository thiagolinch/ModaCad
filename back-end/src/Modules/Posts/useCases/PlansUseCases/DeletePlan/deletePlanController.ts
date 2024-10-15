import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePlanUseCase } from "./deletePlanuseCase";



export class DeletePlanController {

    async handle(req: Request, res: Response): Promise<Response> {
        const  {id} = req.params;
        const useCase = container.resolve(DeletePlanUseCase)

        try {
            await useCase.execute(id)
            return res.status(200).send()
        } catch (error) {
            return res.status(404).json({error})
        }
    }
}