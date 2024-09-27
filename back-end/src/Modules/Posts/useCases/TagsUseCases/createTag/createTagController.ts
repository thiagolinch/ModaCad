import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTagUseCase } from "./createTagUseCase";


export class CreateTagController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            slug,
            description,
            feature_image,
            parent_id,
            visibility,
            og_image,
            og_title,
            og_description,
            twitter_image,
            twitter_description,
            meta_title,
            meta_description,
            code_injection_head,
            code_injection_foot,
            cannonical_url,
            accent_color
        } = request.body;
        const useCase = container.resolve(CreateTagUseCase)

        try {
            const tag = await useCase.execute({
                name,
                slug,
                description,
                feature_image,
                parent_id,
                visibility,
                og_image,
                og_title,
                og_description,
                twitter_image,
                twitter_description,
                meta_title,
                meta_description,
                code_injection_head,
                code_injection_foot,
                cannonical_url,
                accent_color
            })

            return response.status(201).json(tag)
        } catch (error) {
            return response.status(400).json({error})
        }
    }
}