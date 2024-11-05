import { GetSearchMangaRequestOptions, MangaContentRating, MangaPublicationDemographic, MangaPublicationStatus } from "../api/manga";
import { Order } from "../api/static";

export default function convertSearchParams(params: URLSearchParams): GetSearchMangaRequestOptions {
    const result: GetSearchMangaRequestOptions = {
        availableTranslatedLanguage: ['en']
    }
    const limit = params.get('limit')
    result.limit = limit ? parseInt(limit) : 24

    const offset = params.get('offset')
    result.offset = offset ? parseInt(offset) : 0

    if (params.getAll('includedTags[]').length > 0) {
        result.includedTags = params.getAll('includedTags[]')
    }
    if (params.getAll('publicationDemographic[]').length > 0) {
        result.publicationDemographic = params.getAll('publicationDemographic[]') as MangaPublicationDemographic[]
    } else {
        result.publicationDemographic = []
    }
    if (params.getAll('contentRating[]').length > 0) {
        result.contentRating = params.getAll('contentRating[]') as MangaContentRating[]
    } else {
        result.contentRating = []
    }
    if (params.getAll('status[]').length > 0) {
        result.status = params.getAll('status[]') as MangaPublicationStatus[]
    } else {
        result.status = []
    }
    if (params.get("title")) {
        result.title = encodeURIComponent(params.get("title")!)
    }

    // order
    result.order = {}
    if (params.get("order[latestUploadedChapter]")) {
        result.order.latestUploadedChapter = params.get("order[latestUploadedChapter]") as Order
    }
    if (params.get("order[title]")) {
        result.order.title = params.get("order[title]") as Order
    }
    if (params.get("order[updatedAt]")) {
        result.order.updatedAt = params.get("order[updatedAt]") as Order
    }
    if (params.get("order[createdAt]")) {
        result.order.createdAt = params.get("order[createdAt]") as Order
    }
    if (params.get("order[followedCount]")) {
        result.order.followedCount = params.get("order[followedCount]") as Order
    }
    if (params.get("order[relevance]")) {
        result.order.relevance = params.get("order[relevance]") as Order
    }
    if (params.get("order[rating]")) {
        result.order.rating = params.get("order[rating]") as Order
    }
    return result
}