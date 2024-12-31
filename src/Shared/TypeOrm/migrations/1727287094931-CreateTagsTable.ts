import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTagsTable1727287094931 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "tags",
                    columns: [
                        { name: "id", type: "uuid", isPrimary: true, },
                        { name: "name", type: "varchar"},
                        { name: "slug", type: "varchar"},
                        { name: "description", type: "varchar"},
                        { name: "feature_image", type: "varchar"},
                        { name: "parent_id", type: "varchar", isNullable: true},
                        { name: "visibility", type: "varchar"},
                        { name: "og_image", type: "varchar", isNullable: true},
                        { name: "og_title", type: "varchar", isNullable: true},
                        { name: "og_description", type: "varchar", isNullable: true},
                        { name: "twitte_title", type: "varchar", isNullable: true},
                        { name: "twitter_description", type: "varchar", isNullable: true},
                        { name: "meta_title", type: "varchar", isNullable: true},
                        { name: "meta_description", type: "varchar", isNullable: true},
                        { name: "code_injection_head", type: "varchar", isNullable: true},
                        { name: "code_injection_foot", type: "varchar", isNullable: true},
                        { name: "cannonical_url", type: "varchar", isNullable: true},
                        { name: "accesnt_color", type: "varchar", isNullable: true},
                        { name: "create_at", type: "timestamp", default: "now()" },
                        { name: "updated_at", type: "timestamp", default: "now()" }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tags")
    }

}
