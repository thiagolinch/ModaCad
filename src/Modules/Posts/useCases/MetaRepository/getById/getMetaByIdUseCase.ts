import { inject, injectable } from "tsyringe";
import { Meta } from "../../../entity/Meta";
import { IMetaRepository } from "../../../repository/IMetaRepository";


@injectable()
export class GetMetaByIdUseCase {
    constructor(
        @inject("MetaRepository")
        private metaRepo: IMetaRepository
    ){}

    async handle(id: string): Promise<Meta> {
        const meta = await this.metaRepo.getById(id)

        if(!meta) {
            throw new Error("Dados inválidos ou inexistente.").message
        }

        return meta;
    }
}