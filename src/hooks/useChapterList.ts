import { GetMangaIdFeedRequestOptions, MangaContentRating, getMangaIdFeed } from "@/api/manga";
import { Chapter } from "@/api/schema";
import { Includes, Order } from "@/api/static";
import useSWR from "swr";

export default function useChapterList(mangaId: string | null | undefined, page: number, limit: number) {
  let chapters: Record<string, Chapter[]> = {};
  const ids: string[] = [];

  const requestParams: GetMangaIdFeedRequestOptions = {
    limit,
    offset: (page - 1) * limit,
    includes: [Includes.SCANLATION_GROUP, Includes.USER],
    order: { volume: Order.DESC, chapter: Order.DESC },
    contentRating: [MangaContentRating.SAFE, MangaContentRating.EROTICA, MangaContentRating.SUGGESTIVE, MangaContentRating.PORNOGRAPHIC],
    translatedLanguage: ['en']
  };

  const { data, isLoading } = useSWR(mangaId ? [`mangaFeed`, mangaId, page] : null,
    () => getMangaIdFeed(mangaId!, requestParams)
  );
  if (data) {
    const sortedChapters: Record<string, Chapter[]> = {};
    for (const chapter of data.data.data) {
      const volume = chapter.attributes.volume || -1;
      if (!sortedChapters[volume]) {
        sortedChapters[volume] = [];
      }
      sortedChapters[volume].push(chapter);
    }
    chapters = sortedChapters;

    const sortedVolumes = Object.keys(sortedChapters).sort(
      (a, b) => Number(b) - Number(a)
    );
    for (const volume of sortedVolumes) {
      const chapterList = sortedChapters[volume];
      for (const chapter of chapterList) {
        ids.push(chapter.id);
      }
    }
  }

  return { chapters, total: data?.data.total || 0, chaptersLoading: isLoading, chapterIdList: ids };
}
