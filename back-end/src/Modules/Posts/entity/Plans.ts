import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4} from 'uuid'


@Entity("plans")//plans
class Plans {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column("text", { array: true })
    topics: string[];

    @Column()
    price: string;

    @Column()
    sort: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        };
    };
}

export { Plans }