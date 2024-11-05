import useSWR from 'swr/immutable'
import { Manga as MangaApi } from '../api'
import { Includes } from '../api/static'
import { GetSearchMangaRequestOptions } from '@/api/manga'

export default function useSearchManga(options: GetSearchMangaRequestOptions) {
    if (!options.includes) {
        options.includes = [Includes.COVER_ART]
    }
    const { data, isLoading, mutate } = useSWR(['search-manga', options], () => MangaApi.getSearchManga(options))
    const successData = data && data.data.result === "ok" && (data.data)

    return { data: successData, isLoading, mutate }
}