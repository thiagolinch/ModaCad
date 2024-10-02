import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePostUseCase } from "./updatePostUseCase";


class UpdatePostController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {
            admins,
            title,
            description,
            content,
            visibility,
            status,
            type,
            tags,
            subjects,
            og_image,
            og_title,
            og_description,
            twitter_image,
            twitter_title,
            twitter_description,
            meta_title,
            meta_description,
            email_subject,
            frontmatter,
            feature_image_alt,
            feature_image_caption,
            email_only,
        } = request.body;
        const useCase = container.resolve(UpdatePostUseCase)

        try {
            await useCase.execute(
                id,
                admins,
                title,
                description,
                content,
                visibility,
                status,
                type,
                tags,
                subjects,
                og_image,
                og_title,
                og_description,
                twitter_image,
                twitter_title,
                twitter_description,
                meta_title,
                meta_description,
                email_subject,
                frontmatter,
                feature_image_alt,
                feature_image_caption,
                email_only,
            )
            return response.status(200).send()
        } catch (error) {
            return response.status(401).json({error})
        }
    }

}

export { UpdatePostController }