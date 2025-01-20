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
        sort,
        description,
        frequency,
        frequency_type,
        currency_id,
        repetitions,
        isRecurrence,
        mp_url,
        mp_id
    }: IPlansRepositoryDTO): Promise<Plans> {
        const plan = this.repository.create({
            title,
            topics,
            price,
            sort,
            description,
            frequency,
            frequency_type,
            currency_id,
            repetitions,
            isRecurrence,
            mp_url,
            mp_id
        })
        console.log("repository", plan)
        
       const plano = await this.repository.save(plan)

       return plano
    }
    async update({
        id,
        title,
        topics,
        price,
        sort,
        description,
        frequency,
        frequency_type,
        currency_id,
        repetitions
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

        if(description) {
            plan.description = description
        }

        if(frequency) {
            plan.frequency = frequency
        }

        if(frequency_type) {
            plan.frequency_type = frequency_type
        }

        if(currency_id) {
            plan.currency_id = currency_id
        }

        if(repetitions) {
            plan.repetitions = repetitions
        }

        await this.repository.save(plan)

        return plan;
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }
    async list(): Promise<Plans[]> {
        return await this.repository.find({
            order: {
                sort: 'ASC'
            }
        });

    }
    async findById(id: string): Promise<Plans> {
        return await this.repository.findOne({id})
    }

}