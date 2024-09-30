import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./createpostUseCase";


class CreatePostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.admin;
        const { admins, title, description, content, visibility, status, type, tags, subjects } = request.body;

        const createPostUseCase = container.resolve(CreatePostUseCase);

        try {
            const article = await createPostUseCase.execute({
                title,
                description,
                content,
                visibility,
                status,
                type,
                tags,
                subjects,
                admins
            });
    
            return response.status(200).json(article)
        } catch (error) {
            return response.status(400).json({error})
        }
    }
};

export { CreatePostController }