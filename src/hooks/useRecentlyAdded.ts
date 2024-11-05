import { GetSearchMangaRequestOptions, MangaContentRating } from "@/api/manga"
import { Includes, Order } from "@/api/static";
import useSearchManga from "./useSearchManga";


export default function useRecentlyAdded() {
    const requestParams: GetSearchMangaRequestOptions = {
        includes: [Includes.COVER_ART],
        order: { createdAt: Order.DESC },
        contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        limit: 30,
        availableTranslatedLanguage: ['en']
    };

    return useSearchManga(requestParams)
}
