import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTagUseCase } from "./getTagUseCase";



export class GetTagController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(GetTagUseCase)

        try {
            const tag = await useCase.execute(id)
            return res.status(200).json(tag)
        } catch (error) {
           return res.status(404).json({error}) 
        }
    }
}