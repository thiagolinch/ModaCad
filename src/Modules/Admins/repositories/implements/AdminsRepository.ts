import { getRepository, Repository } from "typeorm";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository, IAdminsRepositoryDTO } from "../IAdminsRepository";


class AdminRepository implements IAdminsRepository {
    private repository: Repository<Admins>

    constructor() {
        this.repository = getRepository(Admins);
    }
    async createStaff(email: string, password: string, role: string, terms_conditions: boolean, newsletter: boolean): Promise<void> {
        const staff = this.repository.create({
            email,
            password,
            role,
            terms_conditions,
            newsletter
        })

        await this.repository.save(staff)
    }
    
    async listStaff(
        page: number = 1,
        order: 'ASC' | 'DESC' = 'ASC',
        limit: number = 10
    ): Promise<{
        staffs: Admins[];
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalStaff: number;
        totalAdministradores: number;
        totalEditores: number;
        totalAutores: number;
        totalColaboradores: number
    }> {
        const offset = (page - 1) * limit;

        const totalAdministradores = await this.repository.createQueryBuilder('a')
        .where('a.role = :role', {role: 'administrador'}).getCount();

        const totalEditores = await this.repository.createQueryBuilder('a')
        .where('a.role = :role', {role: 'editor'}).getCount();

        const totalAutores = await this.repository.createQueryBuilder('a')
        .where('a.role = :role', {role: 'autor'}).getCount();

        const totalColaboradores = await this.repository.createQueryBuilder('a')
        .where('a.role = :role', {role: 'colaborador'}).getCount();

        const staffQuery = this.repository.createQueryBuilder("admin")
        .select([
            "admin.id",
            "admin.name",
            "admin.role",
            "admin.email",
            "admin.avatar",
            "admin.created_at"
        ])
        .where("admin.role IN (:...roles)", { roles: ['administrador', 'editor', 'autor', 'colaborador'] });

        // Calcula total de registros antes da paginação
        const totalStaff = await staffQuery.getCount();

        // Ordena globalmente
        const validOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
        staffQuery.orderBy("admin.created_at", validOrder);
    
        // Adiciona paginação
        staffQuery.skip(offset).take(limit);
    
        // Executa a consulta com ordenação total e paginação
        const staffs = await staffQuery.getMany();
    
        // Calcula total de páginas
        const totalPages = Math.ceil(totalStaff / limit);
    
        return {
            staffs,
            currentPage: page,
            totalPages,
            pageSize: limit,
            totalStaff,
            totalAdministradores,
            totalEditores,
            totalAutores,
            totalColaboradores,
        };
    }

    async findByIds(id: string[]): Promise<Admins[]> {
        return await this.repository.findByIds(id)
    }

    async update(
        id: string,
        name?: string,
        cellphone?: string,
        email?: string,
        role?: string,
        status_id?: string,
        plan_id?: string
    ): Promise<void> {
        const user = await this.repository.findOne({id})

        if(name) {
            user.name = name
        }
        if(cellphone) {
            user.cellphone = cellphone
        }
        if(email){
            user.email = email
        }
        if(role){
            user.role = role
        }       
        if(status_id) {
            user.status = status_id
        }
        if(plan_id){
            user.plan = plan_id
        }

        await this.repository.save(user)
    }

    async updatePayment(paymnt_id: string, id: string): Promise<void> {
        const user = await this.repository.findOne({id})

        user.payment_id = paymnt_id
        user.subscription_created_at = new Date();

        await this.repository.save(user)
    }

    async updatePassword(id: string, password: string): Promise<void> {
        const user = await this.repository.findOne({id});

        user.password = password

        await this.repository.save(user)

    }

    async listUsers(
        role: string,
        page: number = 1,
        plan_id: string,
        status_id: string,
        order: 'ASC' | 'DESC' = 'ASC',
        limit: number = 10
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
    }> {
        
        if(role) {

            const totalMembros = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'membro' })
            .getCount();
            
            const adms = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'administrador'})
            .getCount();
            const editores = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'editor'})
            .getCount()
            const autor = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'autor'})
            .getCount()

            const totalStaff = editores + autor + adms

            const totalAssinantes = await this.repository.createQueryBuilder('m')
            .where('m.role = :role', {role: 'assinante'})
            .getCount();

            const totalExAssinantes = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'ex-assinante'})
            .getCount();

            const offset = (page - 1) * limit;
        
            const userQuery = this.repository.createQueryBuilder("u")
            .select([
                "u.id",
                "u.name",
                "u.email",
                "u.avatar",
                "u.role",
                "status.id",
                "status.name",
                "u.cellphone",
                "u.payment_id",
                "u.payment_created_at",
                "u.subscription_created_at",
                "u.created_at",
                "plan.id",
                "plan.title",
            ])
            .where("u.role = :role", {role})
            .leftJoin("u.plans", "plan")
            .leftJoin("u.status_id", "status")

            if(status_id) {
                userQuery.andWhere("u.status = :status_id", {status_id})
            }

            if(plan_id) {
                userQuery.andWhere("u.plan = :plan_id", { plan_id })
            }

            // Calcula total de registros antes da paginação
            const totalItems = await userQuery.getCount();
        
            // Ordena globalmente
            const validOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
            userQuery.orderBy("u.created_at", validOrder);
        
            // Adiciona paginação
            userQuery.skip(offset).take(limit);
        
            // Executa a consulta com ordenação total e paginação
            const users = await userQuery.getMany();
        
            // Calcula total de páginas
            const totalPages = Math.ceil(totalItems / limit);
        
            return {
                users,
                currentPage: page,
                totalPages,
                totalItems,
                pageSize: limit,
                totalMembros,
                totalStaff,
                totalAssinantes,
                totalExAssinantes
            };
        }else {
            
            const offset = (page - 1) * limit;

            const totalMembros = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'membro' })
            .getCount();
            
            const adms = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'administrador'})
            .getCount();
            const editores = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'editor'})
            .getCount()
            const autor = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'autor'})
            .getCount()

            const totalStaff = editores + autor + adms

            const totalAssinantes = await this.repository.createQueryBuilder('m')
            .where('m.role = :role', {role: 'assinante'})
            .getCount();

            const totalExAssinantes = await this.repository.createQueryBuilder('a')
            .where('a.role = :role', {role: 'ex-assinante'})
            .getCount()
        
            const userQuery = this.repository.createQueryBuilder("u")
            .select([
                "u.id",
                "u.name",
                "u.email",
                "u.avatar",
                "u.role",
                "status.id",
                "status.name",
                "u.cellphone",
                "u.payment_id",
                "u.payment_created_at",
                "u.subscription_created_at",
                "u.created_at",
                "plan.id",
                "plan.title",
            ])
            .where("u.role = :role", {role: 'membro'})
            .leftJoin("u.plans", "plan")
            .leftJoin("u.status_id", "status")

            if(status_id) {
                userQuery.andWhere("u.status = :status_id", {status_id})
            }

            if(plan_id) {
                userQuery.andWhere("u.plan = :plan_id", { plan_id })
            }

            // Calcula total de registros antes da paginação
            const totalItems = await userQuery.getCount();
        
            // Ordena globalmente
            const validOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
            userQuery.orderBy("u.created_at", validOrder);
        
            // Adiciona paginação
            userQuery.skip(offset).take(limit);
        
            // Executa a consulta com ordenação total e paginação
            const users = await userQuery.getMany();
        
            // Calcula total de páginas
            const totalPages = Math.ceil(totalItems / limit);
        
            return {
                users,
                currentPage: page,
                totalPages,
                totalItems,
                pageSize: limit,
                totalStaff,
                totalMembros,
                totalAssinantes,
                totalExAssinantes
            };
        }
    }

    async updateAvatar({ id, name, cellphone, email, password, role, avatar }: IAdminsRepositoryDTO): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({avatar})
        .where("id = :id")
        .setParameters({id})
        .execute();
    }

    async updatePlan(user: IAdminsRepositoryDTO): Promise<void> {
        await this.repository.update(user.id, {
            plan: user.plan, // Atualiza o plano
            role: user.role, // Atualiza o papel
        });
        
    }

    async create({ name, cellphone, email, password, role, avatar }: IAdminsRepositoryDTO): Promise<Admins> {
        const admin =  this.repository.create({
            name,
            email,
            password,
            cellphone,
            role,
            avatar
        });

        await this.repository.save(admin);

        return admin
    }

    async findById(id: string): Promise<Admins> {
        // return await this.repository.findOne({id})

        const profile = await this.repository.createQueryBuilder("u")
        .select([
            "u.id",
            "u.name",
            "u.email",
            "u.avatar",
            "u.role",
            "status.id",
            "status.name",
            "u.cellphone",
            "u.payment_id",
            "u.payment_created_at",
            "u.payment_updated_at",
            "u.subscription_created_at",
            "plan.id",
            "plan.title",
            "plan.price"
        ])
        .where({id})
        .leftJoin("u.plans", "plan")
        .leftJoin("u.status_id", "status")
        .getOne();

        return profile
    }

    async findByEmail(email: string): Promise<Admins> {
        return await this.repository.findOne({email})
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }

}

export { AdminRepository }