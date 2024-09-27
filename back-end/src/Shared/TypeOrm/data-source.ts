import "reflect-metadata"
import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { Subjects } from "../../Modules/Assuntos/entities/Subject"
import { Members } from "../../Modules/Members/entities/Members";
import { Admins } from "../../Modules/Admins/entity/Admins";
import { AdminRole } from "../../Modules/Admins/entity/AdminRole";
import { AdminTokens } from "../../Modules/Admins/entity/AdminToken";
import { Articles } from "../../Modules/Posts/entity/Articles";
import { Plans } from "../../Modules/Posts/entity/Plans";
import { ArticleImage } from "../../Modules/Posts/entity/ArticleImage";
import { S3StorageProvider } from "../container/providers/StorageProvider/Implements/S3StorageProvider";
import { Tags } from "../../Modules/Posts/entity/Tags";

export default async (host = "db-pg-modacad-lws-do-user-1617328-0.c.db.ondigitalocean.com"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  
  return createConnection(
    Object.assign(defaultOptions, {
      host,
      entities: [
        Subjects,
        Members,
        Admins,
        AdminRole,
        AdminTokens,
        Articles,
        Plans,
        ArticleImage,
        S3StorageProvider,
        Tags
      ]
    })
  );
};