import { container } from "tsyringe"
import { Status } from "../../../entity/Status"
import { ListStatusUseCase } from "./listStatusUseCase"
import { Request, Response } from "express"


export class ListStatusController {

    async handle(req: Request, res: Response): Promise<Response> {
        const useCase = container.resolve(ListStatusUseCase)

        try {
            const status = await useCase.execute()
            return res.status(200).json(status)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
}