import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostAdmin } from "./createPostAdmin";


class CreatePostAdminController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const {admin_id} = req.body;
        const useCase = container.resolve(CreatePostAdmin)

        try {
            const post = await useCase.execute({post_id: id, admin_id})
            return res.status(200).json(post)
        } catch (error) {
            return res.status(400).json({error})
        }
    }
}

export { CreatePostAdminController }