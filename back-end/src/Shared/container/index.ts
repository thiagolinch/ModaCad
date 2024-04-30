import { container } from 'tsyringe';

import { ITagsRepository } from '../../Modules/Tags/repositories/ITagsRepository';
import { TagRepository } from '../../Modules/Tags/repositories/implements/TagsRepository';

container.registerSingleton<ITagsRepository>(
    "TagRepository",
    TagRepository
)