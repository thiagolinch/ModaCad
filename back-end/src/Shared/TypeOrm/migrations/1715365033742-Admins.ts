import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Admins1715365033742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "admins",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar"
                        },
                        {
                            name: "cellphone",
                            type: "varchar",
                            isUnique: true
                        },
                        {
                            name: "email",
                            type: "varchar",
                            isUnique: true
                        },
                        {
                            name: "admin_role_id",
                            type: "uuid"
                        },
                        {
                            name: "password",
                            type: "varchar"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "now()"
                        },
                    ],
                    foreignKeys: [
                        {
                            name: "FK_ADMIN_ROLE",
                            referencedTableName: "admin_role",
                            referencedColumnNames: ["id"],
                            columnNames: ["admin_role_id"],
                            onDelete: "SET NULL",
                            onUpdate: "CASCADE"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("admins")
    }

}
