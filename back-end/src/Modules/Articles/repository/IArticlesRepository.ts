import { Articles } from "../entity/Articles"


interface IArticlesRepositoryDTO {
    id?: string,
    title: string,
    description: string,
    text: string,
    author: string,
    tags_id: string
}

interface IArticlesRepository {
    create({title, description, tags_id, author, text}: IArticlesRepositoryDTO): Promise<Articles>
    list(): Promise<Articles[]>
    delete(id: string): Promise<void>

    findByName(name: string): Promise<Articles>
}

export {IArticlesRepository, IArticlesRepositoryDTO}