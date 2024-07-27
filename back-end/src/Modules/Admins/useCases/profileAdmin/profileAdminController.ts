import { Request, Response } from "express";
import { container } from "tsyringe";
import { AdminProfileUseCase } from "./profileAdminUseCase";

class AdminProfileController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const adminProfileUC = container.resolve(AdminProfileUseCase)

        const admin = await adminProfileUC.execute(id)
        console.log(admin)

        return response.status(200).json(admin)
    }
}

export { AdminProfileController }