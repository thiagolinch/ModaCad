import { container } from 'tsyringe';

import { ISubjectsRepository } from '../../Modules/Assuntos/repositories/ISubjectsRepository';
import { SubjectRepository } from '../../Modules/Assuntos/repositories/implements/SubjectRepository';

import "./providers"

import { IMembersRepository } from '../../Modules/Members/repositories/IMembersRepository';
import { MembersRepository } from '../../Modules/Members/repositories/implements/MembersRepository';

import { IAdminsRepository } from '../../Modules/Admins/repositories/IAdminsRepository';
import { AdminRepository } from '../../Modules/Admins/repositories/implements/AdminsRepository';

import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';
import { IDateProvider } from './providers/DateProvider/IDateProvider';
import { DaysJSDateProvider } from './providers/DateProvider/implementations/DayJsDateProvider';
import { IAdminTokensRepository } from '../../Modules/Admins/repositories/IAdminTokenRepository';
import { AdminTokenRepository } from '../../Modules/Admins/repositories/implements/AdminTokenRepository';
import { IArticlesRepository } from '../../Modules/Posts/repository/IArticlesRepository';
import { ArticleRepository } from '../../Modules/Posts/repository/implements/ArticlesRepository';
import { IArticleImageRepository } from '../../Modules/Posts/repository/IArticlesImage';
import { ArticleImageRepository } from '../../Modules/Posts/repository/implements/ArticleImage';
import { S3StorageProvider } from './providers/StorageProvider/Implements/S3StorageProvider';
import { AdminRoleRepository } from '../../Modules/Admins/repositories/implements/AdminRoleRepository';
import { IAdminRoleRepository } from '../../Modules/Admins/repositories/IAdminRole';
import { ITagsRepository } from '../../Modules/Posts/repository/ITagsRepository';
import { TagsRepository } from '../../Modules/Posts/repository/implements/TagsRepository';
import { IMetaRepository } from '../../Modules/Posts/repository/IMetaRepository';
import { MetaRepository } from '../../Modules/Posts/repository/implements/MetaRepository';

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

container.registerSingleton<IAdminRoleRepository>(
    "AdminRoleRepository",
    AdminRoleRepository
)

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
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

container.registerSingleton<ITagsRepository>(
    "TagsRepository",
    TagsRepository
)

container.registerSingleton<IMetaRepository>(
    "MetaRepository",
    MetaRepository
)