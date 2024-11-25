import { Plans } from "../entity/Plans";


interface IPlansRepositoryDTO {
    id?: string;
    title: string;
    topics: string[];
    price: number;
    sort: number; // Presumindo que sort é do tipo number
    description: string;
    frequency: string;
    frequency_type: string;
    transaction_amount: number;
    currency_id: string;
    repetitions: number
}

interface IPlansRepository {
    create({
        title,
        topics,
        price,
        sort,
        description,
        frequency,
        frequency_type,
        transaction_amount,
        currency_id,
        repetitions
    }: IPlansRepositoryDTO): Promise<void>;
    update({
        id,
        title,
        topics,
        price,
        sort,
        description,
        frequency,
        frequency_type,
        transaction_amount,
        currency_id,
        repetitions
    }: IPlansRepositoryDTO): Promise<Plans>;
    delete(id: string): Promise<void>;
    list(): Promise<Plans[]>
    findById(id: string): Promise<Plans>;
}

export { IPlansRepository, IPlansRepositoryDTO }