import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class articles1717006341562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "posts",
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
                            name: "author",
                            type: "uuid",
                        },
                        {
                            name: "tags_id",
                            type: "uuid"
                        },
                        {
                            name: "plaintext",
                            type: "varchar"
                        },
                        {
                            name: "feature_image",
                            type: "uuid"
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
                            name: "show_title_and_feature_image",
                            type: "varchar"
                        },
                        {
                            name: "markups",
                            type: "Array"
                        },
                        {
                            name: "plaintext",
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
        await queryRunner.dropTable("posts")
    }

}
