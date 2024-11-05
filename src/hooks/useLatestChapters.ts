import { GetChapterRequestOptions, getChapter } from "../api/chapter"
import useSWR from 'swr/immutable'
import { Includes, Order } from "../api/static";
import { GetSearchMangaRequestOptions, MangaContentRating, getSearchManga } from "@/api/manga";
import { Chapter, Manga } from "@/api/schema";
import isEmpty from "@/utils/isEmpty";


export default function useLatestChapters(page: number) {
    const chapterRequestParams: GetChapterRequestOptions = {
        limit: 64,
        offset: (page - 1) * 64,
        includes: [Includes.SCANLATION_GROUP, Includes.USER],
        order: { readableAt: Order.DESC },
        contentRating: [MangaContentRating.SAFE, MangaContentRating.EROTICA, MangaContentRating.SUGGESTIVE, MangaContentRating.PORNOGRAPHIC],
        translatedLanguage: ['en']
    };
    const { data: latestChapter, isLoading: chapterLoading } = useSWR(['lastestChapter', page], () => getChapter(chapterRequestParams))
    const chapterData = latestChapter && latestChapter.data.result === "ok" && (latestChapter.data)
    const latestChapters: { [key: string]: Chapter[] } = {};

    if (chapterData && !chapterLoading) {
        for (const chapter of chapterData.data) {
            const mangaId = chapter.relationships?.filter(rela => rela.type == "manga")[0].id
            if (!latestChapters[mangaId]) {
                latestChapters[mangaId] = []
            }
            latestChapters[mangaId].push(chapter)
        }
    }

    const mangaRequestParams: GetSearchMangaRequestOptions = {
        includes: [Includes.COVER_ART],
        ids: [],
        contentRating: [MangaContentRating.EROTICA, MangaContentRating.PORNOGRAPHIC, MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        availableTranslatedLanguage: ['en'],
        limit: 64
    };

    if (!isEmpty(latestChapters)) {
        mangaRequestParams.ids = Object.keys(latestChapters)
    }

    const { data, isLoading } = useSWR(!chapterLoading && !isEmpty(latestChapters) ? ['lastestUpdates', page] : null, () => getSearchManga(mangaRequestParams))
    const successData = data && data.data.result === "ok" && (data.data)
    const updates: { [key: string]: { manga: Manga, chapterList: Chapter[] } } = {}

    if (successData && !isLoading) {
        for (const manga of successData.data) {
            updates[manga.id] = { manga, chapterList: latestChapters[manga.id] }
        }
    }

    return { latestUpdates: updates, latestUpdatesLoading: isLoading }
}
