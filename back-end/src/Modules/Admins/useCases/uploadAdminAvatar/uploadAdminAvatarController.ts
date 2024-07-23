import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadAdminAvatarUseCase } from "./uploadAdminAvatarUseCase";

interface IFiles {
    filename: string;
}

class UploadAdminAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const images = request.files as IFiles[];
        const uploadAdminAvatarUseCase = container.resolve(UploadAdminAvatarUseCase)

        const admin_avatar_name = images.map((file) => file.filename)

        try {
            await uploadAdminAvatarUseCase.execute({admin_avatar_name, admin_id: id})
            return response.status(201).send()
        } catch (error) {
            
        }
    }
}

export { UploadAdminAvatarController }