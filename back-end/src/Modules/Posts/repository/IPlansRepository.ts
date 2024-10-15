import { Plans } from "../entity/Plans";


interface IPlansRepositoryDTO {
    id?: string;
    title: string;
    topics: string[];
    price: string; // Alterado para string
    sort: number; // Presumindo que sort é do tipo number
}

interface IPlansRepository {
    create({
        title,
        topics,
        price,
        sort
    }: IPlansRepositoryDTO): Promise<void>;
    update({
        id,
        title,
        topics,
        price,
        sort
    }: IPlansRepositoryDTO): Promise<Plans>;
    delete(id: string): Promise<void>;
    list(): Promise<Plans[]>
    findById(id: string): Promise<Plans>;
}

export { IPlansRepository, IPlansRepositoryDTO }