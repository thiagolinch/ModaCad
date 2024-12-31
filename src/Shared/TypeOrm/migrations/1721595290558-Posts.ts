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
                            name: "description",
                            type: "varchar",
                        },
                        {
                            name: "content",
                            type: "varchar",
                        },
                        {
                            name: "admin",
                            type: "varchar",
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
                            name: "tags",
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
                            columnNames: ["admin"],
                            onDelete: "CASCADE",
                            onUpdate: "CASCADE"
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
