import { Status } from "../entity/Status";

interface IStatusRepositoryDTO {
    id?: string;
    name: string;
}

interface IStatusRepository {
    listStatus(): Promise<Status[]>;
    getStatusById(id: string): Promise<Status>;
}

export {IStatusRepositoryDTO, IStatusRepository }