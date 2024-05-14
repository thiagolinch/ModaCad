import { Members } from "../entities/Members";

interface IMembersRepositoryDTO {
    id?: string,
    name: string,
    email: string,
    password: string
    isPro?: boolean
}


interface IMembersRepository {

    create({
        name,
        email,
        password,
        isPro
    }: IMembersRepositoryDTO): Promise<Members>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Members>;
    findByEmail(email: string): Promise<Members>;
}

export { IMembersRepository, IMembersRepositoryDTO }