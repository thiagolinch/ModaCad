import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadAdminAvatarUseCase } from "./uploadAdminAvatarUseCase";


class UploadAdminAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.admin;
        const updateUserAvatarUseCase = container.resolve(UploadAdminAvatarUseCase);
        const admin_avatar_file = request.file.filename;

        updateUserAvatarUseCase.execute({admin_id: id, admin_avatar_file});

        return response.status(204).send();
    };
}

export { UploadAdminAvatarController }