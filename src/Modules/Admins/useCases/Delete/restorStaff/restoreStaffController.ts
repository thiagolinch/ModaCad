import { Request, Response } from "express";
import { container } from "tsyringe";
import { RestoreStaffUseCase } from "./restoreStaffUseCase"

export class RestoreStaffController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        try {
            const restoreStaffUseCase = container.resolve(RestoreStaffUseCase)
            await restoreStaffUseCase.execute(id)

            return res.status(200).json({ message: "Staff member restored successfully." })
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }

            console.error("Unexpected error:", error)
            return res.status(500).json({ message: "Internal server error:", error })
        }
        
    }
}