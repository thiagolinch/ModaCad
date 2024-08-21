import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateArticleImages1724243525096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "article_image",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "article_id",
                        type: "varchar"
                    },
                    {
                        name: "image_name",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKImagesPost",
                        referencedTableName: "articles",
                        referencedColumnNames: ["id"],
                        columnNames: ["article_id"],
                        onUpdate: "SET NULL",
                        onDelete: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("article_image")
    }

}
