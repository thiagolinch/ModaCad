import { inject, injectable } from "tsyringe";

import { ITagsRepository, ITagsRepositoryDTO } from "../../repositories/ITagsRepository";
import { Tags } from "../../entities/Tags";


@injectable()
class ListTagUseCase {
    constructor(
        @inject("TagRepository")
        private TagsRepository: ITagsRepository
    ){}

    async execute (): Promise<Tags[]> {
        const tags = await this.TagsRepository.listTags()
        console.log(tags)

        return tags;
    }

}

export { ListTagUseCase }