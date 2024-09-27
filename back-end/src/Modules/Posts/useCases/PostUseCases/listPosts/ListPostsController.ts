import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPostUseCase } from "./listPostUseCase";


class ListPostsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listUC = container.resolve(ListPostUseCase)

        try {
            const posts = await listUC.execute()
            return response.status(200).json(posts)
        } catch (error) {
            return response.status(400).json({error})
        }
    }
}

export { ListPostsController }