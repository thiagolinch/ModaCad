import "reflect-metadata"
import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { Tags } from "../../Modules/Tags/entities/Tags"
import { Members } from "../../Modules/Members/entities/Members";
import { Admins } from "../../Modules/Admins/entity/Admins";

export default async (host = ""): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  
  return createConnection(
    Object.assign(defaultOptions, {
      host,
      entities: [
        Tags,
        Members,
        Admins
      ]
    })
  );
};