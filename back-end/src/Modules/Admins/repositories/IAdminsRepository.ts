import { Admins } from "../entity/Admins"


interface IAdminsRepositoryDTO {
    id?: string,
    name: string,
    cellphone: string,
    email: string,
    password: string,
    admin_role_id: string;
    avatar?: string;
}

interface IAdminsRepository {
    create(data: IAdminsRepositoryDTO): Promise<Admins>
    findById(id: string): Promise<Admins>
    upgradeToPro(id: string): Promise<void>
    findByEmail(email: string): Promise<Admins>
    delete(id: string): Promise<void>
    listAll(): Promise<Admins[]>
    updateAvatar(data: IAdminsRepositoryDTO): Promise<void>;
}

export { IAdminsRepository, IAdminsRepositoryDTO }