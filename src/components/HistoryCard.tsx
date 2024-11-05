import { readingHistory } from "@/hooks/useReadingHistory";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export function HistoryCard({ id, data, handleDelete }: { id: string, data: readingHistory, handleDelete: () => void }) {
  return (
    <div className="w-full h-24 mb-6 flex relative border-b-2 pb-1">
      <Link to={`/book/${id}`} className="h-full w-auto shrink-0">
        <img src={data.cover} className="w-16 h-24 object-cover rounded-md" />
      </Link>
      <div className="flex flex-col justify-center gap-2 ml-2 py-1 mr-10">
        <Link to={`/book/${id}`} className="text-lg font-bold line-clamp-2">{data.mangaTitle}</Link>
        <Link to={`/chapter/${data.chapterId}`} className="line-clamp-1">{data.chapterTitle}</Link>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-[#E75C62] hover:text-white cursor-pointer rounded-md" onClick={handleDelete}><Icon icon="mdi:trash-outline" height={24} width={24} /></div>
    </div>
  );
}
