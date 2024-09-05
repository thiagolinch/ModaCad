import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class articles1717006341562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "articles",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "title",
                            type: "varchar",
                        },
                        {
                            name: "slug",
                            type: "varchar",
                        },
                        {
                            name: "html",
                            type: "varchar",
                        },
                        {
                            name: "admin_id",
                            type: "uuid",
                        },
                        {
                            name: "plaintext",
                            type: "varchar"
                        },
                        {
                            name: "type",
                            type: "varchar"
                        },
                        {
                            name: "status",
                            type: "varchar"
                        },
                        {
                            name: "visibility",
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
                        }
                    ],

                    foreignKeys: [
                        {
                            name: "FKAuthorsPost",
                            referencedTableName: "admins",
                            referencedColumnNames: ["id"],
                            columnNames: ["admin_id"],
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("articles")
    }

}
