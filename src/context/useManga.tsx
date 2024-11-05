import { GetMangaIdFeedResponse, MangaContentRating, getMangaId, getMangaIdFeed } from "../api/manga";
import { createContext, useContext, useState, useEffect } from "react";
import { Includes, Order } from "../api/static";
import { getChapterId } from "../api/chapter";
import { Manga } from "@/api/schema";


type MangaContextProps = {
    manga: Manga | null;
    updateManga: (id: string) => Promise<void>;
    mangaFeed: GetMangaIdFeedResponse | null;
    updateMangaByChapterId: (cid: string) => Promise<void>;
    clearManga: () => void;
}

export const MangaContext = createContext<MangaContextProps>({
    manga: null,
    updateManga: () => Promise.resolve(),
    mangaFeed: null,
    updateMangaByChapterId: () => Promise.resolve(),
    clearManga: () => null,
});

export function MangaProvider({ children }: { children: React.ReactNode }) {
    const [manga, setManga] = useState<Manga | null>(null)
    const [mangaFeed, setMangaFeed] = useState<GetMangaIdFeedResponse | null>(null)

    const updateManga = async (id: string) => {
        if (id) {
            const { data } = await getMangaId(id, {
                includes: [Includes.COVER_ART, Includes.ARTIST, Includes.AUTHOR, Includes.CHAPTER, Includes.TAG],
            })
            if (data && data.data) {
                setManga(data.data)
            }
        }
    }

    const updateMangaByChapterId = async (cid: string) => {
        const { data } = await getChapterId(cid)
        if (data && data.data) {
            updateManga(data.data.relationships.filter(rela => rela.type == "manga")[0].id).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        const getCurrentMangaFeed = async (id: string) => {
            const requestParams = {
                limit: 500,
                includes: [Includes.SCANLATION_GROUP, Includes.USER],
                order: { volume: Order.DESC, chapter: Order.DESC },
                contentRating: [MangaContentRating.SAFE, MangaContentRating.EROTICA, MangaContentRating.SUGGESTIVE, MangaContentRating.PORNOGRAPHIC],
                translatedLanguage: ['en']
            };
            const { data } = await getMangaIdFeed(id, requestParams)
            if (data) {
                setMangaFeed(data)
            }
        }
        if (manga) {
            getCurrentMangaFeed(manga.id).catch(err => console.log(err))
        }
    }, [manga])

    const clearManga = () => {
        setManga(null)
        setMangaFeed(null)
    }

    return (
        <MangaContext.Provider value={{ manga, updateManga, mangaFeed, updateMangaByChapterId, clearManga }}>
            {children}
        </MangaContext.Provider>
    );
}

export const useManga = () => useContext(MangaContext);
