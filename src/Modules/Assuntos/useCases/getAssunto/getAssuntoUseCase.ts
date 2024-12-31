import { inject, injectable } from "tsyringe";
import { ISubjectsRepository } from "../../repositories/ISubjectsRepository";
import { Subjects } from "../../entities/Subject";



@injectable()
export class GetAssuntoUseCase {
    constructor(
        @inject("SubjectRepository")
        private repo: ISubjectsRepository
    ){}

    async execute(id: string): Promise<Subjects> {
        const data = await this.repo.findById(id)

        return data
    }
}