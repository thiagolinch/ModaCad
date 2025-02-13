import { Request, Response } from "express";
import { container } from "tsyringe";
import { MaisLidosUseCase } from "./maisLidosUseCase";


export class MaisLidosController {

    async handle(req: Request, res: Response): Promise<Response> {
        const posts = [
            "e79e02ab-f209-4a6f-8df1-ed7549dd4750",
            "e2fea888-ba17-4334-bf56-f9dd7cb90aef",
            "24b5d191-bba0-4745-8e95-74a5d30a0508",
            "d3a8c6f4-b07e-4b69-8a8b-e22d3410441d",
            "c4ad6cc6-a807-4a7c-a802-bf05be61ab22",
            "475fee32-84c2-401b-ac53-7114132798d0",
            "e79e02ab-f209-4a6f-8df1-ed7549dd4750",
            "3f63ea32-b7b4-4ec6-94d0-3bdfa0906924",
            "92e7abe0-08f2-487a-a965-5ebc883cfb28"
        ]
        const useCase = container.resolve(MaisLidosUseCase);

        try {
            const data = await useCase.execute(posts);
            return res.status(200).json({data})
        } catch (error) {
            console.log("create post controller: ", error)
            return res.status(400).json({error})
        }
    }
}