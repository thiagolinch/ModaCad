import { Request, Response } from "express";
import { container } from "tsyringe";
import { ExportMembersUseCase } from "./exportMembersUseCase";

export class ExportMembersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const exportMembersUseCase = container.resolve(ExportMembersUseCase);

    const fileBuffer = await exportMembersUseCase.execute();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=membros.xlsx"
    );

    return res.send(fileBuffer);
  }
}
