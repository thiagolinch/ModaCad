import { Transform } from "stream";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4} from 'uuid'


@Entity("plans")//plans
class Plans {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string

    @Column("text", { array: true })
    topics: string[];

    @Column('numeric')
    price: number;

    @Column()
    frequency: number;

    @Column()
    frequency_type: string;

    @Column()
    transaction_amount: number

    @Column()
    currency_id: string;

    @Column()
    repetitions: number;

    @Column()
    isRecurrence: boolean;

    @Column()
    mp_url: string;

    @Column()
    mp_id: string;

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