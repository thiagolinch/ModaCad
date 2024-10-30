import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";



export class DeleteUserController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const useCase = container.resolve(DeleteUserUseCase)

        try {
            await useCase.execute(id)
            return res.status(200).send()
        } catch (error) {
            return res.status(404).json( error )
        }
    }
}