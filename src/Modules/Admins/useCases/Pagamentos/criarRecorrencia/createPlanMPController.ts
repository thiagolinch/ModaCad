import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePlanMPUseCase } from "./createPlanUseCase";



export class CreatePlanMPController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.admin
        const {
            reason,
            frequency,
            frequency_type,
            transaction_amount,
            currency_id,
            repetitions,
            back_url,
        } = req.body;
        const useCase = container.resolve(CreatePlanMPUseCase)

        try {
            const data = await useCase.execute(
                reason,
                frequency,
                frequency_type,
                transaction_amount,
                currency_id,
                repetitions,
                back_url,
                id
           )
            return res.status(201).json(data)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}