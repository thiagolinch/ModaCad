import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordUseCase } from "./sendForgotPasswordEmailUseCase";


class SendForgotPasswordEmailController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const sendForgotPasswordUseCase = container.resolve(SendForgotPasswordUseCase)

        try {
            const mail = await sendForgotPasswordUseCase.execute(email)
            return response.status(200).json(mail)
        } catch (error) {
            return response.status(400).json(error)
        }
        
    }
}

export { SendForgotPasswordEmailController }