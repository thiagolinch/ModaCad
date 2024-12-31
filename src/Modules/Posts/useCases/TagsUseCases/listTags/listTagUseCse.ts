import { inject, injectable } from "tsyringe";
import { ITagsRepository } from "../../../repository/ITagsRepository";
import { Tags } from "../../../entity/Tags";


@injectable()
export class ListTagsUseCase {
    constructor(
        @inject("TagsRepository")
        private repository: ITagsRepository
    ) {}

    async execute(): Promise<Tags[]> {
        const tags = await this.repository.list()

        return tags
    }
}