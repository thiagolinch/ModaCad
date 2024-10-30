import { Request, Response } from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import 'dotenv/config';
import { container } from 'tsyringe';
import { CreatepaymenteUseCase } from './createPaymentUseCase';

export class CreatePaymentController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.admin;
        const {
            transaction_amount,
            description,
            payment_method_id,
            token
        } = req.body;
        const useCase = container.resolve(CreatepaymenteUseCase)



        try {
            const paymentResponse = await useCase.execute({
                id,
                transaction_amount,
                description,
                payment_method_id,
                token
            })
            return res.status(201).json(paymentResponse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
