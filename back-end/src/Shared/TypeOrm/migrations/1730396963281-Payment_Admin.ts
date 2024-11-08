import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PaymentAdmin1730396963281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "payment_admin",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "payment_id",
                            type: "varchar",
                            isUnique: true
                        },
                        {
                            name: "admin_id",
                            type: "varchar"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payment_admin")
    }

}
