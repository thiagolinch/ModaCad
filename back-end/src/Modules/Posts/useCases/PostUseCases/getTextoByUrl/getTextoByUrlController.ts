import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTextoByUrlUseCase } from "./getTextoByUrlUseCase";


export class GetTextoByUrlController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {url} = req.params
        const useCase = container.resolve(GetTextoByUrlUseCase)
        console.log(url)
        try {
            const data = await useCase.execute(url)
            return res.status(200).json(data)
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}