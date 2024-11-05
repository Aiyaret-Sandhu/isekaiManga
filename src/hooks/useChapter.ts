import { GetChapterIdRequestOptions, getChapterId } from "@/api/chapter"
import { Includes } from "@/api/static";
import useSWR from 'swr/immutable'


export default function useChapter(id: string | null | undefined) {
    const requestParams: GetChapterIdRequestOptions = {
        includes: [Includes.MANGA, Includes.SCANLATION_GROUP, Includes.USER],
    };
    const { data, isLoading } = useSWR(id ? ['chapter', id] : null, () => getChapterId(id!, requestParams))

    return { chapter: data?.data.data, chapterLoading: isLoading }
}
