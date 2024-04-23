import { Repository,  } from "typeorm";

import { ITagsRepository } from "../repositories/ITagsRepository";
import { Tags } from "../entities/Tags";

import { AppDataSource } from "../../../Shared/TypeOrm/data-source";


class TagRepository implements ITagsRepository {
    private repository: Repository<Tags>

    constructor() {
        this.repository = AppDataSource.getRepository(Tags)
    }
    
    findById(id: string): Promise<Tags> {
        throw new Error("Method not implemented.");
    }

    async create(): Promise<Tags> {
        const account = this.repository.create();

        await this.repository.save(account)

        return account;
    }

   /*  async findById(id: string): Promise<Tags> {
        return await this.repository.findOne({id})
    } */

    async updateBalance(id: string, name: string): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({name})
        .where("id = :id")
        .setParameters({id})
        .execute();
    }

}

export { TagRepository }