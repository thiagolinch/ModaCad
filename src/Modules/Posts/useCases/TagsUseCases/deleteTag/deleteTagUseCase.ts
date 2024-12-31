import { inject, injectable } from "tsyringe";
import { ITagsRepository } from "../../../repository/ITagsRepository";


@injectable()
export class DeleteTagUseCase {
    constructor(
        @inject("TagsRepository")
        private repository: ITagsRepository
    ) {}

    async execute(id: string): Promise<void> {
        const tagExists = await this.repository.getById(id)

        if(!tagExists) {
            throw new Error("Esta tag nao existe e não pode ser apagada.").message
        }

        
        await this.repository.delete(id)
    }

}