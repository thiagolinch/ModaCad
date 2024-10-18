import { container } from "tsyringe";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { S3StorageProvider } from "./StorageProvider/Implements/S3StorageProvider";
import { IMercadoPagoProvider } from "./PagamentoProvider/IMercadoPagoProvider";
import { MercadoPagoProvider } from "./PagamentoProvider/implements/MercadoPagoProvider";


container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
);

container.registerSingleton<IMercadoPagoProvider> (
    "MPagoProvider",
    MercadoPagoProvider
)