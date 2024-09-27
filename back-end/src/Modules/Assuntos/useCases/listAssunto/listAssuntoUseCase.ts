import { inject, injectable } from "tsyringe";

import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../../repositories/ISubjectsRepository";
import { Subjects } from "../../entities/Subject";


@injectable()
class listAssuntoUseCase {
    constructor(
        @inject("SubjectRepository")
        private subjectsRepository: ISubjectsRepository
    ){}

    async execute (): Promise<Subjects[]> {
        const subjects = await this.subjectsRepository.listTags()

        return subjects;
    }

}

export { listAssuntoUseCase }