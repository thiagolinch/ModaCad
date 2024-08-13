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
                            name: "admin_id",
                            type: "varchar",
                        },
                        {
                            name: "subjects_id",
                            type: "varchar"
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
                            name: "comments_id",
                            type: "uuid"
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
                        },
                        {
                            name: "FKSubjectsPost",
                            referencedTableName: "subjects",
                            referencedColumnNames: ["id"],
                            columnNames: ["subjects_id"],
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
