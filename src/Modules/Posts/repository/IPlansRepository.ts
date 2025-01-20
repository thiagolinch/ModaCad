import { Plans } from "../entity/Plans";


interface IPlansRepositoryDTO {
    id?: string;
    title: string;
    topics: string[];
    price: number;
    sort: number; // Presumindo que sort é do tipo number
    description: string;
    frequency: number;
    frequency_type: string;
    currency_id: string;
    repetitions: number;
    isRecurrence: boolean;
    mp_url?: string;
    mp_id?: string;
    back_url?: string;
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
        currency_id,
        repetitions,
        isRecurrence,
        mp_url,
        mp_id
    }: IPlansRepositoryDTO): Promise<Plans>;

    update({
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
    }: IPlansRepositoryDTO): Promise<Plans>;
    delete(id: string): Promise<void>;
    list(): Promise<Plans[]>
    findById(id: string): Promise<Plans>;
}

export { IPlansRepository, IPlansRepositoryDTO }