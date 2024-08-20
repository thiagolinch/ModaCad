import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadArticleImageUseCase } from "./uploadArticleImgUseCase";

interface IFiles {
    filename: string;
}

class UploadArticleImageController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const images = request.files as IFiles[];
        const uploadArticleImageUseCase = container.resolve(UploadArticleImageUseCase)

        const image_name = images.map((file) => file.filename)
        try {
            await uploadArticleImageUseCase.execute({image_name, article_id: id})
            return response.status(201).send()
        } catch (error) {
            
        }
    }
}

export { UploadArticleImageController }