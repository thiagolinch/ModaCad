import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetStatusUseCase } from "./getStatusUseCase";



export class GetStatusController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(GetStatusUseCase)

        try {
            const status = useCase.execute(id)
            return res.status(200).json(status)
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}