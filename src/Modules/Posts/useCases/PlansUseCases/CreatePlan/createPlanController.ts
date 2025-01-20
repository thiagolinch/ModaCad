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
            currency_id,
            repetitions,
            isRecurrence
        } = req.body;

        const useCase = container.resolve(CreatePlanUseCase)

        try {
            const data = await useCase.execute({title, topics, price, sort, description, frequency, frequency_type, currency_id, repetitions, isRecurrence})
            return res.status(200).json({ data })
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}