import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteFeatureImageUseCase } from "./deleteFeatureImageUseCase";


export class DeleteFeatureImageController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(DeleteFeatureImageUseCase)

        try {
            await useCase.execute(id)
            return res.status(200).send()
        } catch (error) {
            return res.status(400).json({error})
        }
    }
}