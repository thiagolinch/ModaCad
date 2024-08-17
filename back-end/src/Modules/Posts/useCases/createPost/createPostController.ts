import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./createpostUseCase";


class CreatePostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            title,
            slug,
            subjects_id,
            html,
            feature_image,
            visibility,
            show_title_and_feature_image,
            status,
            type,
            plaintext,
            admin_id,
            comments_id
        } = request.body;
        const createPostUseCase = container.resolve(CreatePostUseCase);

        try {
            const post = await createPostUseCase.execute({
                title,
                slug,
                subjects_id,
                html,
                feature_image,
                visibility,
                show_title_and_feature_image,
                status,
                type,
                plaintext,
                admin_id,
                comments_id
            })
            return response.status(200).json(post)
        } catch (error) {
            return response.status(400).json({error})
        }
    }
};

export { CreatePostController }