import { inject, injectable } from "tsyringe";
import { IStatusRepository } from "../../../repository/IStatusRepository";
import { Status } from "../../../entity/Status";


@injectable()
export class GetStatusUseCase {
    constructor(
        @inject("StatusRepository")
        private statusRepo: IStatusRepository
    ){}

    async execute(id: string): Promise<Status> {
        return await this.statusRepo.getStatusById(id)
    }
}