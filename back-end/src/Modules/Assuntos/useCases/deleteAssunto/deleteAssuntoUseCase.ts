import { inject, injectable } from "tsyringe";
import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../../repositories/ISubjectsRepository";


@injectable()
class DeleteSubjectUseCase {
    constructor(
        @inject("SubjectRepository")
        private SubjectRepository: ISubjectsRepository
    ){}

    async execute({name}: ISubjectsRepositoryDTO): Promise<void> {
        const tagExists = await this.SubjectRepository.findByName(name)

        if(!tagExists) {
            throw new Error("This tag does not exists").message
        }

        await this.SubjectRepository.delete(name)
    }
}

export { DeleteSubjectUseCase }