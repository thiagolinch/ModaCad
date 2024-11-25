import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePlanUseCase } from "./createPlanUseCase";


export class CreatePlanController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            title,
            topics,
            price,
            sort,
            description,
            frequency,
            frequency_type,
            transaction_amount,
            currency_id,
            repetitions,
        } = req.body;
        const useCase = container.resolve(CreatePlanUseCase)

        try {
            await useCase.execute({title, topics, price, sort, description, frequency, frequency_type, transaction_amount, currency_id, repetitions})
            return res.status(200).send()
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}