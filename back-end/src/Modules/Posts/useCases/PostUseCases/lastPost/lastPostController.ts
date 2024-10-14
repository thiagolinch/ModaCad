import { container } from "tsyringe";
import { LastPostUseCase } from "./lastPostUseCase";
import { Request, Response } from "express";

export class LastPostController {
    
    async handle(req: Request, res: Response): Promise<Response> {
        const useCase = container.resolve(LastPostUseCase);

        try {
            const post = await useCase.execute();
            return res.status(200).json(post);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
