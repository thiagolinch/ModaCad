import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTagsUseCase } from "./listTagUseCse";



export class ListTagsController {

    async handle(req: Request, res: Response): Promise<Response> {
        const useCase = container.resolve(ListTagsUseCase)

        try {
            const tags = await useCase.execute()
            return res.status(200).json(tags)
        } catch (error) {
            return res.status(400).json({error})
        }
    }
}