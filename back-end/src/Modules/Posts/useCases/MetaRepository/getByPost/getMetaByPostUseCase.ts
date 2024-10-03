import { inject, injectable } from "tsyringe";
import { IMetaRepository } from "../../../repository/IMetaRepository";
import { Meta } from "../../../entity/Meta";


@injectable()
export class GetMetaByPostUseCase {
    constructor(
        @inject("MetaRepository")
        private metaRepo: IMetaRepository
    ) {}

    async execute(post_id: string): Promise<Meta>  {
        const meta = await this.metaRepo.getbyPostId(post_id)

        if(!meta) {
            throw new Error("Meta não existente").message
        }

        return meta;
    }
}