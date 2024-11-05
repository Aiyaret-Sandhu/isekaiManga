import { Author, Chapter, Cover, Manga, ScanlationGroup, User } from "./schema";

export type ExtendManga = Manga & {
    cover_art?: Partial<Cover> & Pick<Cover, "id" | "type">
    author?: Partial<Author> & Pick<Author, "id" | "type">
    artist?: Partial<Author> & Pick<Author, 'id' | 'type'>,
}

export type ExtendChapter = Chapter & {
    manga?: Partial<Manga> & Pick<Manga, "id" | "type">
    user?: Partial<User> & Pick<User, "id" | "type">
    scanlation_group?: Partial<ScanlationGroup> & Pick<ScanlationGroup, "id" | "type">
}