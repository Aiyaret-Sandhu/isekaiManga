/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Manga } from "@/api/schema";
import placeholder from "@/assets/No-Image-Placeholder.png";
import Config from "@/config";

export default function getCoverArt(manga: Manga | null | undefined) {
  if (!manga) return placeholder;
  const coverArtRelationship = manga.relationships?.find((rela) => rela.type === 'cover_art')


  if (coverArtRelationship) {
    const encodedUrl = btoa(`https://uploads.mangadex.org/covers/${manga.id}/${coverArtRelationship?.attributes?.fileName}.256.jpg`).replace(/\+/g, "-").replace(/\//g, "_")

    return `${Config.CORS}/v1/image/${encodedUrl}`;
  }
  return placeholder;
}
