import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("admin_role")//admin_role
class AdminRole {
    @PrimaryColumn()
    name: string;

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date
}

export { AdminRole }