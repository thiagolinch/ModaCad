import { inject, injectable } from "tsyringe";
import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../../repositories/ISubjectsRepository";


@injectable()
class DeleteSubjectUseCase {
    constructor(
        @inject("SubjectRepository")
        private SubjectRepository: ISubjectsRepository
    ){}

    async execute(id: string): Promise<void> {
        const tagExists = await this.SubjectRepository.findById(id)

        if(!tagExists) {
            throw new Error("This tag does not exists").message
        }

        await this.SubjectRepository.delete(id)
    }
}

export { DeleteSubjectUseCase }