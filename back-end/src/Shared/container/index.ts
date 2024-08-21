import { container } from 'tsyringe';

import { ISubjectsRepository } from '../../Modules/Assuntos/repositories/ISubjectsRepository';
import { SubjectRepository } from '../../Modules/Assuntos/repositories/implements/SubjectRepository';

import "./providers"

import { IMembersRepository } from '../../Modules/Members/repositories/IMembersRepository';
import { MembersRepository } from '../../Modules/Members/repositories/implements/MembersRepository';

import { IAdminsRepository } from '../../Modules/Admins/repositories/IAdminsRepository';
import { AdminRepository } from '../../Modules/Admins/repositories/implements/AdminsRepository';

import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './providers/StorageProvider/Implements/LocalStorageProvider';
import { IDateProvider } from './providers/DateProvider/IDateProvider';
import { DaysJSDateProvider } from './providers/DateProvider/implementations/DayJsDateProvider';
import { IAdminTokensRepository } from '../../Modules/Admins/repositories/IAdminTokenRepository';
import { AdminTokenRepository } from '../../Modules/Admins/repositories/implements/AdminTokenRepository';
import { IArticlesRepository } from '../../Modules/Posts/repository/IArticlesRepository';
import { ArticleRepository } from '../../Modules/Posts/repository/implements/ArticlesRepository';
import { IArticleImageRepository } from '../../Modules/Posts/repository/IArticlesImage';
import { ArticleImageRepository } from '../../Modules/Posts/repository/implements/ArticleImage';

container.registerSingleton<ISubjectsRepository>(
    "SubjectRepository",
    SubjectRepository
);

container.registerSingleton<IArticlesRepository>(
    "ArticleRepository",
    ArticleRepository
)

container.registerSingleton<IMembersRepository>(
    "MembersRepository",
    MembersRepository
)

container.registerSingleton<IAdminsRepository>(
    "AdminRepository",
    AdminRepository
)


container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    LocalStorageProvider
)

container.registerSingleton<IDateProvider>(
    "DaysJSDateProvider",
    DaysJSDateProvider
)

container.registerSingleton<IAdminTokensRepository>(
    "AdminTokenRepository",
    AdminTokenRepository
)

container.registerSingleton<IArticleImageRepository>(
    "ArticleImageRepository",
    ArticleImageRepository
)