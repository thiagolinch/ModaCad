import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadArticleImageUseCase } from "./uploadArticleImgUseCase";

interface IFile {
    filename: string;
}

class UploadArticleImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const image = request.file as IFile; 
        console.log(image)

        const uploadArticleImageUseCase = container.resolve(UploadArticleImageUseCase);

        const image_name = image.filename;
        const folder = "images";

        try {
            const url = await uploadArticleImageUseCase.execute({ image_name, folder });
            return response.status(201).json(url);
        } catch (error) {
            // Handle the error appropriately
            console.error("Error uploading article image:", error);
            return response.status(500).json({ error: "Internal server error" });
        }
    }
}

export { UploadArticleImageController };
