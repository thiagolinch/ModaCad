import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { AdminRole } from "./AdminRole";
import { Plans } from "../../Posts/entity/Plans";
import { Articles } from "../../Posts/entity/Articles";
import { Status } from "../../Posts/entity/Status";

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
    payment_id: string;

    @CreateDateColumn()
    payment_created_at: Date

    @UpdateDateColumn()
    payment_updated_at: Date

    @Column()
    role?: string;

    @ManyToOne(() => AdminRole)
    @JoinColumn({name: "role"})
    roleAdmin: AdminRole;

    @Column()
    status: string;

    @OneToOne(() => Status)
    @JoinColumn({ name: "status" }) // Usando status_id como chave estrangeira
    status_id: Status;

    @Column()
    plan: string

    @ManyToOne(() => Plans)
    @JoinColumn({name: "plan"})
    plans: Plans;

    @ManyToMany(() => Articles, article => article.admins)
    postsAsAdmin: Articles[];

    @ManyToMany(() => Articles, article => article.editors)
    postsAsEditor: Articles[];

    @ManyToMany(() => Articles, article => article.curadors)
    postsAsCurador: Articles[];


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
    
    @BeforeInsert()
    setPaymentCreatedAt() {
        if (this.payment_id && !this.payment_created_at) {
            this.payment_created_at = new Date();
        }
    }

    @BeforeUpdate()
    setPaymentUpdatedAt() {
        if (this.payment_id) {
            this.payment_updated_at = new Date();
        }
    }
}


export { Admins }