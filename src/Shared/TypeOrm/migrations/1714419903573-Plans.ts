import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Plans1714419903573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "plans",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "title",
                            type: "varchar"
                        },
                        {
                            name: "description",
                            type: "varchar"
                        },
                        {
                            name: "topics",
                            type: "varchar",
                            isNullable: true
                        },
                        {
                            name: "price",
                            type: "varchar"
                        },
                        { name: "created_at", type: "timestamp", default: "now()" },
                        { name: "updated_at", type: "timestamp", default: "now()" }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("plans")
    }

}
