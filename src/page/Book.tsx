/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
import Chapter from "@/components/Chapter";
import { useEffect, useState } from "react";
import { useHeader } from "@/context/useHeader";
import Tag from "@/components/Tag";
import { useParams, useSearchParams } from "react-router-dom";
import { getMangasStatistic } from "@/api/statistic";
import getCoverArt from "@/utils/getCoverArt";
import { getAltMangaTitle, getMangaTitle } from "@/utils/getTitles";
import { MangaStatistic } from "@/api/schema";
import StatisticButton from "@/components/StatisticButton";
import useChapterList from "@/hooks/useChapterList";
import { useManga } from "@/context/useManga";
import useFollow from "@/hooks/useFollow";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";

const LIMIT = 24;

export default function Book() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const { isSidebarOpen, setTitleColor } = useHeader();
  const { id } = useParams();
  const { manga, updateManga } = useManga();
  const [statistic, setStatistic] = useState<MangaStatistic>();
  const [artist, setArtist] = useState("");
  const [author, setAuthor] = useState("");
  const { chapters, total } = useChapterList(id ?? "", page, LIMIT);
  const { follow, addFollow, removeFollow } = useFollow();
  const [isDescending, setIsDescending] = useState(true);

  useEffect(() => {
    setTitleColor("#ffffff");

    return () => setTitleColor("#000000");
  }, []);

  useEffect(() => {
    if (id) {
      updateManga(id).catch((err) => console.log(err));
      getMangasStatistic({ manga: [id] })
        .then((data) => setStatistic(data.data.statistics[id]))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const coverArt = getCoverArt(manga);
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  useEffect(() => {
    if (manga) {
      setArtist(
        manga?.relationships?.find((rela) => rela.type === "artist")?.attributes
          ?.name as string
      );
      setAuthor(
        manga?.relationships?.find((rela) => rela.type === "author")?.attributes
          ?.name as string
      );
    }
  }, [manga]);

  const handlePageClick = (event: { selected: number }) => {
    setSearchParams((prev) => {
      prev.set("page", (event.selected + 1).toString());
      return prev;
    });
  };

  return (
    <div className="relative sm:pt-8 pt-2 ">
      {/* Background image */}
      <div
        className={`fixed h-[600px] max-lg:!w-full bg-no-repeat bg-cover -top-[80px] z-[-1] blur-sm transition-all`}
        style={{
          width: `calc(100% - ${isSidebarOpen ? "256px" : "0px"})`,
          backgroundImage: `url(${coverArt}`,
        }}
      ></div>

      {/* Gradient background container */}
      <div
        className="fixed h-[600px] max-lg:!w-full bg-gradient-to-t from-white sm:bg-gradient-to-l sm:from-transparent sm:to-[#000000] -top-[80px] z-[-1] transition-all"
        style={{ width: `calc(100% - ${isSidebarOpen ? "256px" : "0px"})` }}
      ></div>

      {/* Books details */}
      <div className="flex flex-col z-10">
        <div className="flex sm:h-[260px]">
          {/* Book cover */}
          <div className="sm:absolute sm:max-h-[300px] max-h-[200px] sm:w-[200px] w-[100px] flex shrink-0 justify-start rounded-lg sm:left-10 ml-4 mb-4 sm:m-0">
            <img
              src={coverArt}
              className="h-auto w-full rounded-lg object-top object-contain"
            />
          </div>

          {/* Details */}
          <div className="h-full mr-4">
            <div className="flex flex-col sm:pl-[17rem] pl-4 pb-4 h-full">
              <div className="flex-1">
                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-black sm:text-white mb-1">
                  {getMangaTitle(manga)}
                </h1>
                <p className="xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm text-black sm:text-white mb-1">
                  {getAltMangaTitle(manga)}
                </p>
              </div>
              <p className="xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs text-black sm:text-white">
                {author === artist ? author : author + ", " + artist}
              </p>
              <div className="pt-4 flex gap-2 items-center sm:hidden">
                <span className="px-1 flex items-center text-primary">
                  <Icon
                    icon="iconamoon:star-light"
                    width={20}
                    className="text-primary inline pr-1"
                  />
                  {statistic?.rating["bayesian"].toFixed(2)}
                </span>
                <span className="px-1 flex items-center text-black">
                  <Icon
                    icon="material-symbols:bookmark-outline"
                    width={20}
                    className="text-black inline pr-1"
                  />
                  {statistic?.follows && formatter.format(statistic?.follows)}
                </span>
                <span className="px-1 flex items-center text-black">
                  <Icon
                    icon="majesticons:comment-line"
                    width={20}
                    className="text-black inline pr-1"
                  />
                  {statistic?.comments?.repliesCount &&
                    formatter.format(statistic?.comments?.repliesCount)}
                </span>
                <span className="px-1 flex items-center text-black">
                  <Icon
                    icon="ph:eye"
                    width={20}
                    className="text-black inline pr-1"
                  />
                  N/A
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Utility statistic */}
      <div className="bg-white">
        {/* Utility button and statistic */}
        <div className="sm:pl-[17rem] px-8 pt-2">
          <div className="mt-4 flex gap-2 ">
            {manga != null ? (
              Object.keys(follow).includes(manga.id) ? (
                <button
                  className="bg-primary text-white md:px-10 px-3 py-3 rounded-md flex items-center gap-2 shadow-primaryButton"
                  onClick={() => removeFollow(manga.id)}
                >
                  <Icon
                    icon="mdi:book-check-outline"
                    width={20}
                    color="#ffffff"
                  />
                  <span className="hidden md:inline">Remove from library</span>
                </button>
              ) : (
                <button
                  className="bg-primary text-white md:px-10 px-3 py-3 rounded-md flex items-center gap-2 shadow-primaryButton"
                  onClick={() =>
                    addFollow(manga.id, {
                      mangaTitle: getMangaTitle(manga),
                      cover: getCoverArt(manga),
                    })
                  }
                >
                  <Icon icon="mdi:book-outline" width={20} color="#ffffff" />
                  <span className="hidden md:inline">Add to Library</span>
                </button>
              )
            ) : (
              <div>Loading</div>
            )}
            {/* <button className='bg-slate-200 text-white px-3 py-3 rounded-md'><Icon icon="iconamoon:star-light" width={20} color='#000000' /></button> */}
            <button className="bg-slate-200 text-black lg:px-6 px-3 py-3 rounded-md flex items-center gap-2">
              <Icon icon="ion:book-outline" width={20} color="#000000" />
              <span className="lg:inline sm:hidden inline">Start Reading</span>
            </button>
          </div>

          {/* book's tags */}
          <div className="mt-4 flex gap-2 items-center flex-wrap">
            {/* {manga?.attributes.contentRating === "suggestive" && <Tag contentRating={manga?.attributes.contentRating} />} */}
            {manga?.attributes.tags.map((obj, index) => (
              <Tag key={index} data={obj} />
            ))}
            <span className="text-xs font-bold px-1 uppercase flex items-center">
              <Icon
                icon="icon-park-outline:dot"
                width={20}
                className="inline"
                color="#04d000"
                style={{
                  color: `${manga?.attributes.status ? "#04d000" : "#ff4040"}`,
                }}
              />
              {`Published: ${manga?.attributes.year || ""}, ${
                manga?.attributes.status || ""
              }`}
            </span>
          </div>

          {/* books statistic */}
          <div className="pt-4 sm:flex hidden gap-2 items-center">
            <span className="px-1 flex items-center text-primary">
              <Icon
                icon="iconamoon:star-light"
                width={20}
                className="text-primary inline pr-1"
              />
              {statistic?.rating["bayesian"].toFixed(2)}
            </span>
            <span className="px-1 flex items-center text-black">
              <Icon
                icon="material-symbols:bookmark-outline"
                width={20}
                className="text-black inline pr-1"
              />
              {statistic?.follows && formatter.format(statistic?.follows)}
            </span>
            <span className="px-1 flex items-center text-black">
              <Icon
                icon="majesticons:comment-line"
                width={20}
                className="text-black inline pr-1"
              />
              {statistic?.comments?.repliesCount &&
                formatter.format(statistic?.comments?.repliesCount)}
            </span>
            <span className="px-1 flex items-center text-black">
              <Icon
                icon="ph:eye"
                width={20}
                className="text-black inline pr-1"
              />
              N/A
            </span>
          </div>
        </div>

        {/* More books info */}
        <div className="pt-4 px-8 overflow-hidden ">
          <p className="line-clamp-5 mb-4">
            {manga?.attributes.description['en']}
          </p>
          <div className="flex gap-4 xl:hidden flex-wrap">
            <div>
              <span className="font-bold text-lg text-left">Author</span>
              <div className="flex gap-2 items-center mt-2 mb-4 flex-wrap">
                {author && <StatisticButton title={author} />}
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-left">Artist</span>
              <div className="flex gap-2 items-center mt-2 mb-4 flex-wrap">
                {artist && <StatisticButton title={artist} />}
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-left">Genre</span>
              <div className="flex gap-2 items-center mt-2 mb-4 flex-wrap">
                {manga?.attributes.tags.map((obj, index) => {
                  if (obj.attributes.group === "genre") {
                    return (
                      <StatisticButton
                        key={index}
                        title={obj.attributes.name['en']}
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-left">
                Buy at store
              </span>
              <div className="flex gap-2 items-center mt-2 mb-4 flex-wrap">
                {manga?.attributes.links &&
                  Object.entries(manga.attributes.links).map(
                    ([key, value], index) => {
                      return (
                        <StatisticButton
                          key={index}
                          title={value}
                          linkType={key}
                        />
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* More book info + chapter list */}
        <div className="flex gap-4 px-8">
          <div className="min-w-[400px] max-w-[25%] gap-4 xl:flex hidden flex-col">
            <div>
              <span className="font-bold text-lg text-left">Author</span>
              <div className="flex gap-2 items-center mt-2 mb-4 flex-wrap">
                {author && <StatisticButton title={author} />}
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-left">Artist</span>
              <div className="flex gap-2 items-center mt-2 mb-4 flex-wrap">
                {artist && <StatisticButton title={artist} />}
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-left">Genre</span>
              <div className="flex gap-2 items-center mt-2 mb-4 flex-wrap">
                {manga?.attributes.tags.map((obj, index) => {
                  if (obj.attributes.group === "genre") {
                    return (
                      <StatisticButton
                        key={index}
                        title={obj.attributes.name["en"]}
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-left">
                Buy at store
              </span>
              <div className="flex gap-2 items-center mt-2 mb-4 flex-wrap">
                {manga?.attributes.links &&
                  Object.entries(manga.attributes.links).map(
                    ([key, value], index) => {
                      return (
                        <StatisticButton
                          key={index}
                          title={value}
                          linkType={key}
                        />
                      );
                    }
                  )}
              </div>
            </div>
          </div>

          <div className="grow">
            <div className="flex justify-between">
              {isDescending ? (
                <button
                  className="bg-slate-200 py-1 px-3 rounded-md"
                  onClick={() => setIsDescending((prev) => !prev)}
                >
                  Ascending
                </button>
              ) : (
                <button
                  className="bg-slate-200 py-1 px-3 rounded-md"
                  onClick={() => setIsDescending((prev) => !prev)}
                >
                  Descending
                </button>
              )}
            </div>
            <div>
              {chapters && isDescending
                ? Object.entries(chapters)
                    .reverse()
                    .map(([volume, chapterList], index) => (
                      <Chapter
                        key={index}
                        volume={volume}
                        chapterList={chapterList}
                      />
                    ))
                : Object.entries(chapters).map(
                    ([volume, chapterList], index) => (
                      <Chapter
                        key={index}
                        volume={volume}
                        chapterList={chapterList.reverse()}
                      />
                    )
                  )}
            </div>
            {total && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={Math.floor(total / LIMIT)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={2}
                className="flex gap-2 items-center justify-center m-5"
                pageClassName="block px-3 py-1 rounded-md hover:bg-gray-200"
                activeClassName="text-white bg-primary hover:bg-primary"
                previousClassName="block px-3 py-1 rounded-md hover:bg-gray-200"
                nextClassName="block px-3 py-1 rounded-md hover:bg-gray-200"
                breakClassName="text-center"
                forcePage={page - 1}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
