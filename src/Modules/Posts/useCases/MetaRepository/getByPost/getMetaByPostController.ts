import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetMetaByPostUseCase } from "./getMetaByPostUseCase";


export class GetMetaByPostController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(GetMetaByPostUseCase)

        try {
            const meta = await useCase.execute(id)
            return res.status(200).json(meta)
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}