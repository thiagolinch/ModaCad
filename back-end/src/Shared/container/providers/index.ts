import { container } from "tsyringe";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { S3StorageProvider } from "./StorageProvider/Implements/S3StorageProvider";
import { LocalStorageProvider } from "./StorageProvider/Implements/LocalStorageProvider";


container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
);