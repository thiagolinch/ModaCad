import 'dotenv/config';
import { Request, Response } from "express"
import { container } from "tsyringe"
import { WebhookUseCase } from "./webHookUseCase"
import crypto from 'crypto';


export class UpdateUserPaymentController {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      //const signature = req.headers['x-signature'];
      const { body } = req;
      //const generatedSignature = crypto
      //  .createHmac('sha256', process.env.MERCADOPAGO_WEBHOOK_SECRET)
      //  .update(payload)
      //  .digest('hex');
  
      //if (signature !== generatedSignature) {
      //  console.error('Assinatura inválida. Webhook não autenticado.');
      //  return res.status(401).send('Invalid signature');
      //}
      const useCase = container.resolve(WebhookUseCase);
  
      switch (body.action) {
        case 'payment.created':
          await useCase.execute(body.data.id);
        break;
  
        case 'payment.updated':
          await useCase.execute(body.data.id);
        break;
      }
  
      res.status(200).send('Webhook recebido com sucesso');
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      res.status(500).json({error});
    }
  }
}