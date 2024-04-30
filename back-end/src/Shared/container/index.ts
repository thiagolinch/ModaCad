import { container } from 'tsyringe';

import { ITagsRepository } from '../../Modules/Tags/repositories/ITagsRepository';
import { TagRepository } from '../../Modules/Tags/repositories/implements/TagsRepository';
import { IMembersRepository } from '../../Modules/Members/repositories/IMembersRepository';
import { MembersRepository } from '../../Modules/Members/repositories/implements/MembersRepository';

container.registerSingleton<ITagsRepository>(
    "TagRepository",
    TagRepository
)

container.registerSingleton<IMembersRepository>(
    "MembersRepository",
    MembersRepository
)