import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetMetaByIdUseCase } from "./getMetaByIdUseCase";


export class GetMetaByIdController {

    async execute(req: Request, res: Response): Promise<Response> {
        const { id }= req.params;
        const useCase = container.resolve(GetMetaByIdUseCase)

        try {

            const meta = await useCase.handle(id)
            return res.status(200).json({meta})
            
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}