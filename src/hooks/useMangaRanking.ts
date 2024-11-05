import { GetSearchMangaRequestOptions, MangaContentRating } from "@/api/manga"
import { Includes, Order } from "@/api/static";
import useSearchManga from "./useSearchManga";


export default function useMangaRanking(page: number) {
  const requestParams: GetSearchMangaRequestOptions = {
    includes: [Includes.COVER_ART, Includes.ARTIST, Includes.AUTHOR],
    order: { followedCount: Order.DESC },
    contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
    hasAvailableChapters: "true",
    limit: 15,
    offset: (page - 1) * 15,
    availableTranslatedLanguage: ['en']
  };

  return useSearchManga(requestParams)
}
