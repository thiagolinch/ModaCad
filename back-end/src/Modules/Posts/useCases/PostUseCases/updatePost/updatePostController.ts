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

        // Definindo o esquema de validação
        const schema = Joi.object({
            id: Joi.string().required(),
            admins: Joi.array().items(Joi.string()).required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            content: Joi.string().required(),
            visibility: Joi.string().required(),
            status: Joi.string().required(),
            type: Joi.string().required(),
            tags: Joi.array().items(Joi.string()).required(),
            subjects: Joi.array().items(Joi.string()).required(),
        });

        // Validação
        const { error } = schema.validate({
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
        });

        if (error) {
            return response.status(400).json({ message: error.details.map(err => err.message) });
        }
        
        const useCase = container.resolve(UpdatePostUseCase)

        try {
            await useCase.execute({
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
            })
            return response.status(200).send()
        } catch (error) {
            response.status(400).json({ message: "Erro ao atualizar o post." })
        }
    }

}

export { UpdatePostController }