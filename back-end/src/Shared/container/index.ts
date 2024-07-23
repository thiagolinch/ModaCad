import { container } from 'tsyringe';

import { ITagsRepository } from '../../Modules/Assuntos/repositories/ITagsRepository';
import { TagRepository } from '../../Modules/Assuntos/repositories/implements/TagsRepository';

import { IMembersRepository } from '../../Modules/Members/repositories/IMembersRepository';
import { MembersRepository } from '../../Modules/Members/repositories/implements/MembersRepository';

import { IAdminsRepository } from '../../Modules/Admins/repositories/IAdminsRepository';
import { AdminRepository } from '../../Modules/Admins/repositories/implements/AdminsRepository';

import { IAdminAvatarRepository } from '../../Modules/Admins/repositories/IAdminAvatarRepository';
import { AdminAvatarRepository } from '../../Modules/Admins/repositories/implements/AdminAvatarRepository';

import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './providers/StorageProvider/Implements/LocalStorageProvider';

container.registerSingleton<ITagsRepository>(
    "TagRepository",
    TagRepository
)

container.registerSingleton<IMembersRepository>(
    "MembersRepository",
    MembersRepository
)

container.registerSingleton<IAdminsRepository>(
    "AdminsRepository",
    AdminRepository
)

container.registerSingleton<IAdminAvatarRepository>(
    "AdminAvatarRepository",
    AdminAvatarRepository
)

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    LocalStorageProvider
)
