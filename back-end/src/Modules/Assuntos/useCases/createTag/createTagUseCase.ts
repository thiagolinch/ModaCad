import { inject, injectable } from "tsyringe";

import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../../repositories/ISubjectsRepository";
import { Subjects } from "../../entities/Subject";


@injectable()
class CreateSubjectUseCase {
    constructor(
        @inject("SubjectRepository")
        private TagsRepository: ISubjectsRepository
    ){}

    async execute ({ name }: ISubjectsRepositoryDTO): Promise<Subjects> {
        const tagExists = await this.TagsRepository.findByName(name)

        if(tagExists) {
            throw new Error("This tag already exists").message
        }

        const tag = await this.TagsRepository.create(name)

        return tag;
    }

}

export { CreateSubjectUseCase }