import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPaymentUseCase } from "./getPaymentUseCase";


export class GetPaymentController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(GetPaymentUseCase);

        try {
            const payment = await useCase.execute(id)
            return res.status(200).json(payment)
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}