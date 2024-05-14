import { Admins } from "../entity/Admins"


interface IAdminsRepositoryDTO {
    id?: string,
    name: string,
    cellphone: string,
    email: string,
    password: string,
    admin_pro?: boolean
}

interface IAdminsRepository {
    create({
        name,
        cellphone,
        email,
        password
    }: IAdminsRepositoryDTO): Promise<Admins>
    findByName(name: string): Promise<Admins>
    upgradeToPro(id: string): Promise<void>
    findByEmail(email: string): Promise<Admins>
    delete(id: string): Promise<void>
}

export { IAdminsRepository, IAdminsRepositoryDTO }