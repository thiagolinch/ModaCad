import { inject, injectable } from "tsyringe";
import { IStatusRepository } from "../../../repository/IStatusRepository";
import { Status } from "../../../entity/Status";


@injectable()
export class ListStatusUseCase {
    constructor(
        @inject("StatusRepository")
        private statusRepo: IStatusRepository
    ) {}

    async execute(): Promise<Status[]> {
        const status = await this.statusRepo.listStatus()

        return status
    }
}