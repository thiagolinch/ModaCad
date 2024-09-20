import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadFeatureImageUseCase } from "./uploadFeatureImageUseCase";

interface IFile {
    filename: string;
};

class UploadFeatureImageController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const image = request.file as IFile
        const uploadArticleImageUseCase = container.resolve(UploadFeatureImageUseCase)

        const image_name = image.filename
        const folder = "images"

        try {
            const feature_image = await uploadArticleImageUseCase.execute({image_name, article_id: id, folder})
            return response.status(201).json(feature_image)
        } catch (error) {
            
        };
    };
}

export { UploadFeatureImageController };