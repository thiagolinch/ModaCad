import { inject, injectable } from "tsyringe";

import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../../repositories/ISubjectsRepository";
import { Subjects } from "../../entities/Tags";


@injectable()
class ListSubjectsUseCase {
    constructor(
        @inject("SubjectRepository")
        private TagsRepository: ISubjectsRepository
    ){}

    async execute (): Promise<Subjects[]> {
        const tags = await this.TagsRepository.listTags()

        return tags;
    }

}

export { ListSubjectsUseCase }