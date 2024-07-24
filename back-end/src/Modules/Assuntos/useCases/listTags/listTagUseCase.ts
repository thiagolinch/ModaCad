import { inject, injectable } from "tsyringe";

import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../../repositories/ISubjectsRepository";
import { Subjects } from "../../entities/Tags";


@injectable()
class ListSubjectsUseCase {
    constructor(
        @inject("SubjectRepository")
        private subjectsRepository: ISubjectsRepository
    ){}

    async execute (): Promise<Subjects[]> {
        const subjects = await this.subjectsRepository.listTags()
        console.log(subjects)

        return subjects;
    }

}

export { ListSubjectsUseCase }