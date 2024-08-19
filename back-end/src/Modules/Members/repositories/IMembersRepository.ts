import { Members } from "../entities/Members";

interface IMembersRepositoryDTO {
    id?: string,
    name: string,
    email: string,
    password: string
    member_ship: string
}


interface IMembersRepository {

    create({
        name,
        email,
        password,
        member_ship
    }: IMembersRepositoryDTO): Promise<Members>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Members>;
    findByEmail(email: string): Promise<Members>;
    listAll(): Promise<Members[]>;
}

export { IMembersRepository, IMembersRepositoryDTO }