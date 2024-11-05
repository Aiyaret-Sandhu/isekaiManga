/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Manga } from "@/api/schema";
import Tag from "./Tag";
import getCoverArt from "@/utils/getCoverArt";
import { getMangaTitle } from "@/utils/getTitles";
import { useNavigate } from "react-router-dom";

export default function PopularCard({ data }: { data?: Manga }) {
  const coverArt = getCoverArt(data);
  const artist =
    (data?.relationships.find((rela) => rela.type === "artist")?.attributes
      ?.name as string) || "";
  const author =
    (data?.relationships.find((rela) => rela.type === "author")?.attributes
      ?.name as string) || "";
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="h-[510px] rounded-lg animate-pulse flex p-4 bg-slate-100">
        <div className="w-[190px] h-full rounded-lg bg-slate-200"></div>

        <div className="ml-4 h-full flex-1 w-full flex flex-col justify-between">
          <div className="w-full">
            <div className="bg-slate-200 w-full h-8 mb-4"></div>
            {/* Description */}
            <div className="bg-slate-200 w-full h-20"></div>
          </div>
          {/* Author */}
          <div className="bg-slate-200 w-28 h-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col sm:flex-row h-auto sm:h-[400px] md:h-[510px] p-4 sm:p-6 md:p-10 rounded-sm transition-all overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full z-[-2] rounded-md overflow-hidden">
        <img
          src={`${coverArt}`}
          alt="Background"
          loading="lazy"
          className="object-cover w-full h-full blur-lg opacity-30 rounded-sm"
        />
      </div>
      <button
        onClick={() => navigate(`/book/${data.id}`)}
        className="flex-shrink-0 w-full sm:w-[150px] md:w-[200px] lg:w-[300px] h-64 sm:h-full mb-4 sm:mb-0 overflow-hidden rounded-sm"
      >
        <img
          referrerPolicy="no-referrer"
          src={coverArt}
          alt="Book Cover"
          className="object-cover sm:object-contain w-full h-full rounded-sm"
          loading="lazy"
        />
      </button>
      <div className="flex-1 sm:ml-4 h-full flex flex-col sm:p-2 md:p-6 lg:p-10">
        <div className="shrink-0 mb-2">
          <button onClick={() => navigate(`/book/${data.id}`)}>
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl line-clamp-2 text-gray-200">
              {getMangaTitle(data)}
            </span>
          </button>
          <div className="flex gap-2 my-2 flex-wrap">
            {data?.attributes.contentRating === "suggestive" && (
              <Tag contentRating={data?.attributes.contentRating} />
            )}
            {data.attributes.tags.map((obj, index) => {
              if (obj.attributes.group === "genre") {
                return <Tag key={index} data={obj} />
              }
            })}
          </div>
        </div>
        <div className="overflow-y-auto grow mb-2 max-h-32 sm:max-h-none">
          <p className="text-xs sm:text-sm overflow-hidden text-gray-400">
            {data.attributes?.description["en"]}
          </p>
        </div>
        <p className="text-sm sm:text-base text-gray-300">
          {author === artist ? author : author + ", " + artist}
        </p>
      </div>
    </div>
  );
}
