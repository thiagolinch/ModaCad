import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./createpostUseCase";


class CreatePostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.admin;

        const {
            admins,
            title,
            feature_image,
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
        } = request.body;
        const postStatus = request.postStatus
        console.log(postStatus)

        const createPostUseCase = container.resolve(CreatePostUseCase);

        try {
            const articleId = await createPostUseCase.execute({
                title,
                feature_image,
                description,
                content,
                visibility,
                status,
                type,
                tags,
                subjects,
                admins,
                editors,
                curadors,
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
                published_at
            });
    
            return response.status(200).json(articleId)
        } catch (error) {
            return response.status(400).json({error})
        }
    }
};

export { CreatePostController }