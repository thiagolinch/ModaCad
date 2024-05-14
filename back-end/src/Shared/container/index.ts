import { container } from 'tsyringe';

import { ITagsRepository } from '../../Modules/Tags/repositories/ITagsRepository';
import { TagRepository } from '../../Modules/Tags/repositories/implements/TagsRepository';

import { IMembersRepository } from '../../Modules/Members/repositories/IMembersRepository';
import { MembersRepository } from '../../Modules/Members/repositories/implements/MembersRepository';

import { IAdminsRepository } from '../../Modules/Admins/repository/IAdminsRepository';
import { AdminRepository } from '../../Modules/Admins/repository/implements/AdminsRepository';

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