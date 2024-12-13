import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserByIdUseCase } from "./getUserByIdUseCase";


export class GetUserByIdController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(GetUserByIdUseCase)

        try {
            const data = await useCase.execute(id)
            return res.status(200).json(data)
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}