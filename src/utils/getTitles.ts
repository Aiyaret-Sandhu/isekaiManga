/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Chapter, Manga } from "@/api/schema";

export function getMangaTitle(manga: Manga | null | undefined) {
    if (!manga) return ""
    return manga.attributes.altTitles.find(t => t['en'])?.['en'] || manga.attributes.title?.['en'] || Object.values(manga.attributes.title)?.[0] || "No title";
}

export function getMangaTitleByChapter(chapter: Chapter | null | undefined) {
    const rela = chapter?.relationships?.find(rela => rela.type === 'manga')
    if (!rela || !rela?.attributes) return ""
    else {
        return rela?.attributes?.altTitles.find((t: { [x: string]: any; }) => t['en'])?.['en'] || rela.attributes.title?.['en'] || Object.values(rela.attributes.title)?.[0] || "No title";
    }
}


export function getAltMangaTitle(manga: Manga | null | undefined) {
    if (!manga) return ""
    return manga.attributes.altTitles.find(t => t['vi']) && manga.attributes.title?.['en'] ||
        manga.attributes.altTitles.find(t => t['en'])?.['en'] ||
        manga.attributes.altTitles.find(t => t['jp-ro'])?.['jp-ro'] ||
        manga.attributes.altTitles.find(t => t['ja'])?.['ja'] || "";
}