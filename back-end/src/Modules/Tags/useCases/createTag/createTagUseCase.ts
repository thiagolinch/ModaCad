import { inject, injectable } from "tsyringe";

import { ITagsRepository, ITagsRepositoryDTO } from "../../repositories/ITagsRepository";
import { Tags } from "../../entities/Tags";


@injectable()
class CreateTagUseCase {
    constructor(
        @inject("TagRepository")
        private TagsRepository: ITagsRepository
    ){}

    async execute ({ name }: ITagsRepositoryDTO): Promise<Tags> {
        const tagExists = await this.TagsRepository.findByName(name)

        if(tagExists) {
            throw new Error("This tag already exists").message
        }

        const tag = await this.TagsRepository.create(name)

        return tag;
    }

}

export { CreateTagUseCase }