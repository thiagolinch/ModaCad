import { container } from "tsyringe";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { S3StorageProvider } from "./StorageProvider/Implements/S3StorageProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DaysJSDateProvider } from "./DateProvider/implementations/DayJsDateProvider";
import { ZohoMailProvaider } from "./MailProvider/implements/ZohoMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";

container.registerSingleton<IDateProvider>(
    "DaysJSDateProvider",
    DaysJSDateProvider
)

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
);

container.registerInstance<IMailProvider>(
    "ZohoMailProvaider",
    new ZohoMailProvaider()
)