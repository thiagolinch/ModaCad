import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTagUseCase } from "./updateTagUseCase";


export class UpdateTagController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
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
            twitter_title,
            twitter_image,
            twitter_description,
            meta_title,
            meta_description,
            code_injection_head,
            code_injection_foot,
            cannonical_url,
            accent_color
        } = req.body;
        const useCase = container.resolve(UpdateTagUseCase)

        try {
            const tag = await useCase.execute(
                id,
                name,
                slug,
                description,
                feature_image,
                parent_id,
                visibility,
                og_image,
                og_title,
                og_description,
                twitter_title,
                twitter_image,
                twitter_description,
                meta_title,
                meta_description,
                code_injection_head,
                code_injection_foot,
                cannonical_url,
                accent_color
            )
            return res.status(200).json(tag)
        } catch (error) {
            
        }
    }
}