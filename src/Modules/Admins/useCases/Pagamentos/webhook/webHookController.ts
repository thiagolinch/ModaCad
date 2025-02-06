import 'dotenv/config';
import { Request, Response } from "express"
import { container } from "tsyringe"
import { WebhookUseCase } from "./webHookUseCase"
import crypto from 'crypto';


export class UpdateUserPaymentController {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      //const signature = req.headers['x-signature'];
      const payload = JSON.stringify(req.body);
      console.log("payolad:  ", payload)
  
      //const generatedSignature = crypto
      //  .createHmac('sha256', process.env.MERCADOPAGO_WEBHOOK_SECRET)
      //  .update(payload)
      //  .digest('hex');
  
      //if (signature !== generatedSignature) {
      //  console.error('Assinatura inválida. Webhook não autenticado.');
      //  return res.status(401).send('Invalid signature');
      //}
  
      const { action, type, data, date_created, user_id, live_mode, resource, topic } = req.body;
      const useCase = container.resolve(WebhookUseCase);
  
      console.log('Webhook recebido:', {
        action,
        type,
        data,
        date_created,
        user_id,
        live_mode,
        resource,
        topic
      });

      const webhookData = {
        action,
        type,
        data,
        date_created,
        user_id,
        live_mode,
      }
  
      switch (action) {
        case 'payment.created':
          console.log('Novo pagamento criado:', data.id);
          const newPayment = await useCase.execute(data.id);
          break;
  
        case 'payment.updated':
          console.log('Pagamento atualizado:', data.id);
          const updatePayment = await useCase.execute(data.id);
          break;
  
        case 'merchant_order.created':
          console.log('Nova ordem de compra criada:', data.id);
          const newOrder = await useCase.execute(data.id);
          console.log("Order: ", newOrder);
          break;
  
        default:
          console.log('Ação desconhecida recebida:', payload);
          console.log("Ação: ", resource, topic);
          break;
      }
  
      res.status(200).send('Webhook recebido com sucesso');
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      res.status(500).send('Erro interno ao processar webhook');
    }
  }
}