import { Request, Response } from "express";
import { container } from "tsyringe";
import { TextoModacadUseCase } from "./textoMdcUseCase";


class TextoMdcController {

    async handle(request: Request, response: Response): Promise<Response> {
        // const {id} = request.params;
        const { identifier } = request.params;
        const useCase = container.resolve(TextoModacadUseCase);

        try {
            const data = await useCase.execute(identifier);

            return response.status(200).json(data);
        } catch (error) {
            return response.status(404).json(error);
        };
    };
};

export { TextoMdcController };