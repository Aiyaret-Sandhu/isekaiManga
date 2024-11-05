import { Chapter } from "@/api/schema"

export default function getChapterTitle(chapter: Chapter | null) {
    if (!chapter) return ""
    else if (chapter.attributes.volume && chapter.attributes.chapter && chapter.attributes.title) return `Chapter ${chapter.attributes.chapter}  Volume ${chapter.attributes.volume} - ${chapter.attributes.title}`
    else if (chapter.attributes.chapter && chapter.attributes.title) return `Chapter ${chapter.attributes.chapter} - ${chapter.attributes.title}`
    else if (chapter.attributes.chapter) return `Chapter ${chapter.attributes.chapter}`
    return "Oneshot"
}