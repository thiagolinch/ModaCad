import { Request, Response } from "express";
import { container } from "tsyringe";
import { TextoModacadUseCase } from "./textoMdcUseCase";


class TextoMdcController {

    async handle(request: Request, response: Response): Promise<Response> {
        const post = request.post; // O post já está formatado no middleware
        console.log(post)

        const useCase = container.resolve(TextoModacadUseCase)
        // let data = null;

        try {
            // const texto = await useCase.execute(id.toString())
            // post == undefined ? data = texto : data = post;

            return response.status(200).json(post)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { TextoMdcController }