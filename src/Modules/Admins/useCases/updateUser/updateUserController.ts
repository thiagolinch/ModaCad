import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./updateUserUseCase";


class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        // Obtém o ID do usuário autenticado (do token)
        const userIdFromToken = request.admin?.id;
        
        // Obtém o ID dos parâmetros da rota
        const userIdFromParams = request.params.id;
        
        // Prioriza o ID do token, mas usa o dos params se não houver no token
        const userId = userIdFromParams || userIdFromToken;

        if (!userId) {
            return response.status(400).json({ error: "ID do usuário não fornecido" });
        }

        const {
            name,
            cellphone,
            email,
            role,
            status_id,
            plan_id
        } = request.body;
        const updateUC = container.resolve(UpdateUserUseCase)

        try {
            await updateUC.execute(
                userId,
                name,
                cellphone,
                email,
                role,
                status_id,
                plan_id
            )
            return response.status(200).send()
        } catch (error) {
            return response.status(404).json({error})
        }
    }
}

export { UpdateUserController }