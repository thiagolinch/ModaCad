import { Admins } from "../entity/Admins"


interface IAdminsRepositoryDTO {
    id?: string,
    name: string,
    cellphone: string,
    email: string,
    password: string,
    role?: string,
    avatar?: string,
    status_id?: string,
    plan_id?: string
}

interface IAdminsRepository {
    create(data: IAdminsRepositoryDTO): Promise<Admins>;
    update(
        id: string,
        name: string,
        cellphone: string,
        email: string,
        role: string,
        status_id: string,
        plan_id: string
    ): Promise<void>;
    updatePassword(id: string, password: string): Promise<void>;

    findById(id: string): Promise<Admins>
    findByIds(id: string[]): Promise<Admins[]>
    findByEmail(email: string): Promise<Admins>
    findStaff(): Promise<Admins[]>

    listUsers(role: string, plan_id?: string, status_id?: string): Promise<Admins[]>

    delete(id: string): Promise<void>
    updateAvatar(data: IAdminsRepositoryDTO): Promise<void>;
}

export { IAdminsRepository, IAdminsRepositoryDTO }