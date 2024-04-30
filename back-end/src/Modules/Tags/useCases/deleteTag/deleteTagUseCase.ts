import { inject, injectable } from "tsyringe";
import { ITagsRepository, ITagsRepositoryDTO } from "../../repositories/ITagsRepository";


@injectable()
class DeleteTagUseCase {
    constructor(
        @inject("TagRepository")
        private tagRepository: ITagsRepository
    ){}

    async execute({name}: ITagsRepositoryDTO): Promise<void> {
        const tagExists = await this.tagRepository.findByName(name)

        if(!tagExists) {
            throw new Error("This tag does not exists").message
        }

        await this.tagRepository.delete(name)
    }
}

export { DeleteTagUseCase }