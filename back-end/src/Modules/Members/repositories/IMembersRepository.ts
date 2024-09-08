import { Members } from "../entities/Members";

interface IMembersRepositoryDTO {
    id?: string,
    name: string,
    email: string,
    password: string
    plan: string,
    status?: string
}


interface IMembersRepository {

    create({
        name,
        email,
        password,
        plan
    }: IMembersRepositoryDTO): Promise<Members>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Members>;
    findByEmail(email: string): Promise<Members>;
    list(status: string, plan: string): Promise<Members[]>;
}

export { IMembersRepository, IMembersRepositoryDTO }