import { Admins } from "../entity/Admins"


interface IAdminsRepositoryDTO {
    id?: string,
    name: string,
    cellphone: string,
    email: string,
    password: string,
    adminPro?: boolean
}

interface IAdminsRepository {
    create({
        name,
        cellphone,
        email,
        password
    }: IAdminsRepositoryDTO): Promise<Admins>
    findById(id: string): Promise<Admins>
    upgradeToPro(id: string): Promise<void>
    findByEmail(email: string): Promise<Admins>
    delete(id: string): Promise<void>
}

export { IAdminsRepository, IAdminsRepositoryDTO }