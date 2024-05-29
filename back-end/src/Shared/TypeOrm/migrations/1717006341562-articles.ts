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
                            name: "text",
                            type: "varchar",
                        },
                        {
                            name: "author",
                            type: "uuid",
                        },
                        {
                            name: "tags_id",
                            type: "uuid"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ],

                    foreignKeys: [
                        {
                            name: "FKAuthorsArticle",
                            referencedTableName: "admins",
                            referencedColumnNames: ["id"],
                            columnNames: ["author"],
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL"
                        },
                        {
                            name: "FKTagsArticle",
                            referencedTableName: "tags",
                            referencedColumnNames: ["id"],
                            columnNames: ["tags_id"],
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
