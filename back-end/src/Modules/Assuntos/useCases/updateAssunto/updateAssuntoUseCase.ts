import { inject, injectable } from "tsyringe";

import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../../repositories/ISubjectsRepository";
import { Subjects } from "../../entities/Subject";


@injectable()
class UpdateSubjectUseCase {
    constructor(
        @inject("SubjectRepository")
        private TagsRepository: ISubjectsRepository
    ){}

    async execute ({ name, sort, id }: ISubjectsRepositoryDTO): Promise<void> {
        const tagExists = await this.TagsRepository.findByName(name)

        if(tagExists) {
            throw new Error("This tag already exists").message
        }

        const tag = await this.TagsRepository.updateTag(id, name, sort)
    }

}

export { UpdateSubjectUseCase }