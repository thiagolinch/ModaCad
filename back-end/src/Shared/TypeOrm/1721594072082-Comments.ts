import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Comments1721594072082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    {
                        name:"id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "comment_text",
                        type: "varchar"
                    },
                    {
                        name: "member_id",
                        type: "varchar"
                    },
                    {
                        name: "article_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "visiblity",
                        type: "boolean"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKMemberComment",
                        referencedTableName: "members",
                        referencedColumnNames: ["id"],
                        columnNames: ["member_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKArticleComment",
                        referencedTableName: "articles",
                        referencedColumnNames: ["id"],
                        columnNames: ["article_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments")
    }

}
