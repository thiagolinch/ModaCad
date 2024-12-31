import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePostUseCase } from "./updatePostUseCase";
import Joi from "joi";


class UpdatePostController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {
            admins,
            title,
            description,
            feature_image,
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
            canonicalUrl,
            published_at,
            editors,
            curadors
        } = request.body;
        const postStatus = request.postStatus;

        console.log("status do post: ", status)
        console.log("status do midd: ", postStatus)
        const useCase = container.resolve(UpdatePostUseCase)

        try {
            await useCase.execute({
                id,
                admins,
                feature_image,
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
                canonicalUrl,
                published_at,
                editors,
                curadors
            })
            return response.status(200).send()
        } catch (error) {
            response.status(400).json(error)
            console.log(error)
        }
    }

}

export { UpdatePostController }