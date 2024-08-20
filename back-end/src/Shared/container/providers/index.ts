import { container } from "tsyringe";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { DgOceantorageProvider } from "./StorageProvider/Implements/dgOcenaProvider";
import { LocalStorageProvider } from "./StorageProvider/Implements/LocalStorageProvider";


container.registerSingleton<IStorageProvider>(
    "DgOceantorageProvider",
    LocalStorageProvider
);