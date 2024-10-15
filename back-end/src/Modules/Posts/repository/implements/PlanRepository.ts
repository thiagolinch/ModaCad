import { getRepository, Repository } from "typeorm";
import { Plans } from "../../entity/Plans";
import { IPlansRepository, IPlansRepositoryDTO } from "../IPlansRepository";


export class PlanRepository implements IPlansRepository {
    private repository: Repository<Plans>

    constructor() {
        this.repository = getRepository(Plans)
    }
    
    async create({
        title,
        topics,
        price,
        sort
    }: IPlansRepositoryDTO): Promise<void> {
        const plan = this.repository.create({
            title,
            topics,
            price,
            sort
        })
        await this.repository.save(plan)
    }
    async update({
        id,
        title,
        topics,
        price,
        sort
    }: IPlansRepositoryDTO): Promise<Plans> {
        const plan = await this.repository.findOne({id})

        if(title) {
            plan.title = title
        }

        if(topics) {
            plan.topics = topics
        }

        if(price) {
            plan.price = price
        }

        if(sort) {
            plan.sort = sort
        }

        await this.repository.save(plan)

        return plan;
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }
    async list(): Promise<Plans[]> {
        return await this.repository.createQueryBuilder("plan")
        .orderBy("plan.sort", "ASC")
        .getMany()
    }
    async findById(id: string): Promise<Plans> {
        return await this.repository.findOne({id})
    }

}