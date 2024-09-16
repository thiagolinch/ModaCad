import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetImageUseCase } from "./getImagesUseCase";

interface IFiles {
    filename: string;
};

class GetImagesController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const getImgUseCase = container.resolve(GetImageUseCase)

        try {
            const imageUrl = await getImgUseCase.execute(id)
            return response.status(200).json(imageUrl)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { GetImagesController }