import "reflect-metadata"
import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { Subjects } from "../../Modules/Assuntos/entities/Tags"
import { Members } from "../../Modules/Members/entities/Members";
import { Admins } from "../../Modules/Admins/entity/Admins";
import { AdminAvatar } from "../../Modules/Admins/entity/AdminAvatar";
import { AdminRole } from "../../Modules/Admins/entity/AdminRole";
import { AdminTokens } from "../../Modules/Admins/entity/AdminToken";

export default async (host = "localhost"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  
  return createConnection(
    Object.assign(defaultOptions, {
      host,
      entities: [
        Subjects,
        Members,
        Admins,
        AdminAvatar,
        AdminRole,
        AdminTokens
      ]
    })
  );
};