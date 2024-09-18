import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePostUseCase } from "./updatePostUseCase";


class UpdatePostController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {
            title,
            description,
            content,
            visibility,
            status,
            type,
            tags,
            subjects
        } = request.body;
        const useCase = container.resolve(UpdatePostUseCase)

        try {
            await useCase.execute(
                id,
                title,
                description,
                content,
                visibility,
                status,
                type,
                tags,
                subjects
            )
            return response.status(200).send()
        } catch (error) {
            return response.status(401).json({error})
        }
    }

}

export { UpdatePostController }