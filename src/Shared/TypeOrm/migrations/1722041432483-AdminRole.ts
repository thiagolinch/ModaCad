import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AdminRole1722041432483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "admin_role",
                    columns: [
                        {
                            name: "name",
                            type: "varchar",
                            isPrimary: true
                        },
                        {
                            name: "description",
                            type: "varchar",
                            isNullable: true
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
        await queryRunner.dropTable("admin_role")
    }

}
