import { container } from 'tsyringe';

import { ISubjectsRepository } from '../../Modules/Assuntos/repositories/ISubjectsRepository';
import { SubjectRepository } from '../../Modules/Assuntos/repositories/implements/SubjectRepository';

import { IMembersRepository } from '../../Modules/Members/repositories/IMembersRepository';
import { MembersRepository } from '../../Modules/Members/repositories/implements/MembersRepository';

import { IAdminsRepository } from '../../Modules/Admins/repositories/IAdminsRepository';
import { AdminRepository } from '../../Modules/Admins/repositories/implements/AdminsRepository';

import { IAdminAvatarRepository } from '../../Modules/Admins/repositories/IAdminAvatarRepository';
import { AdminAvatarRepository } from '../../Modules/Admins/repositories/implements/AdminAvatarRepository';

import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './providers/StorageProvider/Implements/LocalStorageProvider';

container.registerSingleton<ISubjectsRepository>(
    "SubjectRepository",
    SubjectRepository
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
