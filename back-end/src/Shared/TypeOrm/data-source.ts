import "reflect-metadata"
import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { Tags } from "../../Modules/Tags/entities/Tags"
import { Members } from "../../Modules/Members/entities/Members";

export default async (host = "database_modacad"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  
  return createConnection(
    Object.assign(defaultOptions, {
      host,
      entities: [
        Tags,
        Members
      ]
    })
  );
};