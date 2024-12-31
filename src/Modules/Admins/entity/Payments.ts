import { Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"

export class Payment {

    @PrimaryColumn()
    id?: string;

    @Column()
    title: string;

    @Column()
    status: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    payment_method_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}