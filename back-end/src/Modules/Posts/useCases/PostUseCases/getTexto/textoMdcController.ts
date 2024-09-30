import { Request, Response } from "express";
import { container } from "tsyringe";
import { TextoModacadUseCase } from "./textoMdcUseCase";


class TextoMdcController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params
        const useCase = container.resolve(TextoModacadUseCase)

        try {
            const texto = await useCase.execute(id.toString())
            return response.status(200).json(texto)
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { TextoMdcController }