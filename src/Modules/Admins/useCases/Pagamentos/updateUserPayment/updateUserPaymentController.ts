import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateUserPaymentUseCase } from "./updateUserPaymentUC"


export class UpdateUserPaymentController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {
            live_mode, // se foi um pagamento real ou de teste
            type, // tipo de pagamento: pagamento normal ou pagamento de plano e assinaturas
            action, // criou um novo pagamento ou apenas atualizou
            data, 
            api_version,
            user_id, // id do vendedor dentro do mercado pago;
            date_created, // data de pagamento ou atualização de pagamento
            date,
            application_id,
            entity,
            version,
            id // id deste registro;
        } = req.body
        console.log("Request body: ",req.body)
        const useCase = container.resolve(UpdateUserPaymentUseCase);

        const paymentData = {
            live_mode,
            type,
            action,
            payment_id: data.id, // ID do pagamento dentro de `data`
            api_version,
            user_id,
            date_created,
            event_id: id, // ID do registro deste evento
            date,
            application_id,
            entity,
            version,
            id,
            data
          };
      
        
        try {
            await useCase.execute(paymentData)  
    
            return res.status(200).send()
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}