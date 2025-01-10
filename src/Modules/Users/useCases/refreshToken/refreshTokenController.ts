import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenAdminUseCase } from "./refreshTokenAdminUseCase";


class RefreshTokenAdminController {

    async handle(request: Request, response: Response): Promise<Response> {
        const token = request.body.token || request.headers["x-access-token"] || request.query.token

        const refreshTokenUseCase = container.resolve(RefreshTokenAdminUseCase)

        try {
            const returnRefreshToken = await refreshTokenUseCase.execute(token)
            return response.status(200).json({returnRefreshToken})
        } catch (error) {
            response.status(400).json({error})
        }
    }
}

export { RefreshTokenAdminController }