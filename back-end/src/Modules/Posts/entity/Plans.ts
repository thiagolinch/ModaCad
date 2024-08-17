import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4} from 'uuid'


@Entity("plans")//plans
class Plans {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    topics: string;

    @Column()
    price: string;

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        };
    };
}

export { Plans }