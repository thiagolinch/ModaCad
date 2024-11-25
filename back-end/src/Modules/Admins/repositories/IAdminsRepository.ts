import { Admins } from "../entity/Admins"


interface IAdminsRepositoryDTO {
    id?: string,
    name: string,
    cellphone: string,
    email: string,
    password: string,
    role?: string,
    avatar?: string,
    status?: string,
    plan_id?: string,
    payment_id?: string
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
    updatePayment(paymnt_id: string, id: string): Promise<void> 
    updatePlan(user: IAdminsRepositoryDTO, role: string, plan_id: string): Promise<void>;

    findById(id: string): Promise<Admins>
    findByIds(id: string[]): Promise<Admins[]>
    findByEmail(email: string): Promise<Admins>
    findStaff(): Promise<Admins[]>

    listUsers(
        role: string,
        page: number,
        plan_id: string,
        status_id: string, 
        order: string,
        limit: number
    ): Promise<{
        users: Admins[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
        totalMembros: number;
        totalStaff: number;
        totalAssinantes: number;
        totalExAssinantes: number;
    }>;
    
    delete(id: string): Promise<void>
    updateAvatar(data: IAdminsRepositoryDTO): Promise<void>;
}

export { IAdminsRepository, IAdminsRepositoryDTO }