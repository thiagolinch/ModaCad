import { getRepository, Repository } from "typeorm";
import { Status } from "../../entity/Status";
import { IStatusRepository } from "../IStatusRepository";


export class StatusRepository implements IStatusRepository {
    private repository: Repository<Status>

    constructor() {
        this.repository = getRepository(Status)
    }

    async listStatus(): Promise<Status[]> {
        return await this.repository.find({order: {created_at: "DESC"}})
    }
    async getStatusById(id: string): Promise<Status> {
        return await this.repository.findOne({id})
    }

}