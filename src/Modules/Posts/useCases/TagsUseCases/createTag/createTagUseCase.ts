import { inject, injectable } from "tsyringe";
import { ITagsRepository, ITagsRepositoryDTO } from "../../../repository/ITagsRepository";
import { Tags } from "../../../entity/Tags";


@injectable()
export class CreateTagUseCase {
    constructor(
        @inject("TagsRepository")
        private tagRepo: ITagsRepository
    ) {}

    async execute(data: ITagsRepositoryDTO): Promise<Tags> {
        const tag = await this.tagRepo.create(data)

        return tag;
    }
}