import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { AdminRole } from "./AdminRole";
import { Plans } from "../../Posts/entity/Plans";
import { Articles } from "../../Posts/entity/Articles";

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

    @ManyToMany(() => Articles)
    @JoinTable({
        name: "post_admins",
        joinColumn: {
            name: "posts",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "admin",
            referencedColumnName: "id"
        }
    })
    posts: Articles;

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