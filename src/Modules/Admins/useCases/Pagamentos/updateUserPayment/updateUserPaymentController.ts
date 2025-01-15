import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateUserPaymentUseCase } from "./updateUserPaymentUC"


export class UpdateUserPaymentController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {
            live_mode,
            type,
            action,
            data,
            api_version,
            user_id,
            date_created,
            id
        } = req.body
        console.log("Request body: ",req.body)
        const useCase = container.resolve(UpdateUserPaymentUseCase)
        console.log("controller", live_mode, type, action, data, api_version, user_id, date_created, id)
        
        try {
            await useCase.execute(live_mode, type, action, data, api_version, date_created, id, user_id, )  
    
            return res.status(200).send()
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}