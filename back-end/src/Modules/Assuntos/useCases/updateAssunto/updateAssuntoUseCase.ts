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

        await this.TagsRepository.updateTag(id, name, sort)
    }

}

export { UpdateSubjectUseCase }