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
            "3f63ea32-b7b4-4ec6-94d0-3bdfa0906924",
            "92e7abe0-08f2-487a-a965-5ebc883cfb28",
            "f76e98be-3fc9-4fd0-ac92-78828a57c9c4",
            "9c52c0a9-553a-49ac-8d79-225f4aba8c37",
            "1c2400bf-be40-47df-a4cd-9369abdffd89",
            "002bad3d-2c91-4534-8028-89ef5b071ef0",
            "12178b4a-4e24-47f0-a000-129782634bda",
            "28f5e8a2-de24-47d3-a1d7-298f6e6d36e8",
            "e80cd2c4-4b09-4119-988c-a20a2898f957",
            "b654234e-b1ab-4c7d-87cd-cbd22f9732b7"
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