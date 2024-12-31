import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAssuntoUseCase } from "./getAssuntoUseCase";


export class GetAssuntoController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(GetAssuntoUseCase)

        try {
            const data = await useCase.execute(id)
            return res.status(200).json(data)
        } catch (error) {
            console.log(error)
            return res.status(404).json(error)
        }
    }
}