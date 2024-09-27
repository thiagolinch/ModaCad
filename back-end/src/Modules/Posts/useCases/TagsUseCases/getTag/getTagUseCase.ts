import { inject, injectable } from "tsyringe";
import { ITagsRepository } from "../../../repository/ITagsRepository";
import { Tags } from "../../../entity/Tags";


@injectable()
export class GetTagUseCase {
    constructor(
        @inject("TagsRepository")
        private repository: ITagsRepository
    ) {}

    async execute(id: string): Promise<Tags> {
        const tag = await this.repository.getById(id)

        if(!tag) {
            throw new Error("Id incorreto ou Tag não existe.").message
        }

        return tag;
    }
}