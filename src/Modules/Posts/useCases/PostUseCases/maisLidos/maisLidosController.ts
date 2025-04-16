import { Request, Response } from "express";
import { container } from "tsyringe";
import { MaisLidosUseCase } from "./maisLidosUseCase";


export class MaisLidosController {

    async handle(req: Request, res: Response): Promise<Response> {

        // Parâmetros de paginação
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;

        const useCase = container.resolve(MaisLidosUseCase);

        try {
            const data = await useCase.execute(
                page,
                limit,
            );
            return res.status(200).json(data)
        } catch (error) {
            console.log("create post controller: ", error)
            return res.status(400).json({error})
        }
    }
}