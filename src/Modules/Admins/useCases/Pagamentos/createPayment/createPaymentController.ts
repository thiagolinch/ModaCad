import { Request, Response } from 'express';
import 'dotenv/config';
import { container } from 'tsyringe';
import { CreatepaymenteUseCase } from './createPaymentUseCase';

export class CreatePaymentController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.admin;
        const {
            plan_id
        } = req.body;
        const useCase = container.resolve(CreatepaymenteUseCase)



        try {
            const paymentResponse = await useCase.execute(
                id,
                plan_id
            )
            return res.status(201).json(paymentResponse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
