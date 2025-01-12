import { Request, Response } from "express"
import { container, inject } from "tsyringe"
import { IMercadoPagoProvider } from "../../../../../Shared/container/providers/PagamentoProvider/IMercadoPagoProvider"
import { UpdateUserPaymentUseCase } from "./updateUserPaymentUC"


export class UpdateUserPaymentController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.admin
        const {
            live_mode,
            type,
            action,
            data
        } = req.body
        const useCase = container.resolve(UpdateUserPaymentUseCase)

        try {
            const payment = await useCase.execute(id, live_mode, type, action, data.id)
    
            return res.status(200).send()
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}