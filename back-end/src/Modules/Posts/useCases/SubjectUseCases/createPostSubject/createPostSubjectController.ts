import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostSubjectUseCase } from "./createPostSubjectUseCase";


export class CreatePostSubjectController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const {subject_id} = req.body;
        const useCase = container.resolve(CreatePostSubjectUseCase)

        try {
            const post = await useCase.execute({post_id: id, subject_id})
            return res.status(201).json(post)
        } catch (error) {
            return res.status(400).json({error})
        }
    }
}