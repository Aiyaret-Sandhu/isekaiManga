import { Tag } from "@/api/schema";
import { Link } from "react-router-dom";


export function TagItem({item}: {item: Tag}) {
  return (
    <Link to={`/search?includes[]=cover_art&order[followedCount]=desc&limit=30&availableTranslatedLanguage[]=en&includedTags[]=${item.id}`} className="h-[40px] bg-white rounded-3xl inline-flex items-center px-5 shadow-lg m-2">
          <span>{item.attributes.name.en}</span>
    </Link>
  )
}
