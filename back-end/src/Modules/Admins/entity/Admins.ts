import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { AdminRole } from "./AdminRole";
import { Plans } from "../../Posts/entity/Plans";

@Entity("admins")//admins
class Admins {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    cellphone: string;
    
    @Column()
    avatar: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role?: string;

    @ManyToOne(() => AdminRole)
    @JoinColumn({name: "role"})
    roleAdmin: AdminRole;

    @Column()
    status: string;

    @Column()
    plan: string

    @ManyToOne(() => Plans)
    @JoinColumn({name: "plan"})
    plans: Plans;

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    constructor() {
        if(!this.id){
            this.id = uuidV4()
            this.role = "membro"
        }
    }
    
}


export { Admins }