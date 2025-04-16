import "reflect-metadata";
import { Connection } from "typeorm";
import "dotenv/config";
import createConnection from "../../../../TypeOrm/data-source";
import { Articles } from "../../../../../Modules/Posts/entity/Articles";
import { ArticleRepository } from "../../../../../Modules/Posts/repository/implements/ArticlesRepository";
import { AnalyticsService } from "./AnalyticsService";

let connection: Connection;

beforeAll(async () => {
  console.log("🔌 Conectando ao banco de dados...");
  connection = await createConnection("db-pg-modacad-lws-do-user-1617328-0.c.db.ondigitalocean.com");
  console.log("✅ Conexão estabelecida com sucesso.");
});

afterAll(async () => {
  console.log("🛑 Fechando conexão com o banco...");
  await connection.close();
  console.log("✅ Conexão fechada.");
});

test("Testa atualização de views", async () => {
  const repo = new ArticleRepository();

  const service = new AnalyticsService(
    repo,
    process.env.GA_PROPERTY_ID!,
    process.env.GA_CREDENTIALS_PATH!
  );

  console.time("⏱️ Tempo total updatePostsViewCount");
  await service.updatePostsViewCount();
  console.timeEnd("⏱️ Tempo total updatePostsViewCount");

  console.log("✔️ Atualização finalizada.");
}, 50000);
