import Slider, { Settings } from "react-slick";
import { DetailCard } from "@/components/DetailCard";
import { useEffect, useState, useRef } from "react";
import * as MangaApi from "@/api/manga";
import { Tag } from "../api/schema";
import { TagItem } from "@/components/TagItem";
import PopularCard from "@/components/PopularCard";
import usePopularNewTitles from "@/hooks/usePopularNewTitles";
import { HistoryCard } from "@/components/HistoryCard";
import useReadingHistory from "@/hooks/useReadingHistory";
import useMangaRanking from "@/hooks/useMangaRanking";
import RankingCard from "@/components/RankingCard";
import { Icon } from "@iconify/react";
import useLatestChapters from "@/hooks/useLatestChapters";
import { useNavigate } from "react-router-dom";
import useRecentlyAdded from "@/hooks/useRecentlyAdded";
import Card from "@/components/Card";
import isEmpty from "@/utils/isEmpty";

export default function Home() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    lazyLoad: "progressive",
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
  };

  const sliderRef = useRef<Slider | null>(null);

  const navigate = useNavigate();

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const [tag, setTag] = useState<Tag[]>([]);

  const { data: populars, isLoading: popularsLoading } = usePopularNewTitles();
  const { history, removeHistory } = useReadingHistory();
  const { latestUpdates, latestUpdatesLoading } = useLatestChapters(1);
  const { data: ranking, isLoading: rankingLoading } = useMangaRanking(1);
  const { data: recentlyAdded, isLoading: recentlyAddedLoading } =
    useRecentlyAdded();

  useEffect(() => {
    MangaApi.getMangaTag()
      .then((data) => {
        setTag(data?.data?.data.slice(0, 14));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="w-full px-8 select-none"
      style={{ backgroundColor: "#0B0909" }}
    >
      {/*Top manga*/}
      <section className="mb-20 w-full">
        <h2 className="text-3xl mb-4 text-white pt-4 px-4">
          Recommended Manga
        </h2>
        {popularsLoading ? (
          <PopularCard />
        ) : (
          <div className="w-full relative">
            <Slider ref={sliderRef} {...settings}>
              {populars &&
                populars?.data?.map((obj, index) => {
                  return <PopularCard key={index} data={obj} />;
                })}
            </Slider>
            <Icon
              className="absolute top-1/2 -translate-y-1/2 -translate-x-2 left-0 hover:cursor-pointer bg-slate-100 rounded-full"
              icon="iconamoon:arrow-left-2"
              onClick={previous}
              width={40}
            />
            <Icon
              className="absolute top-1/2 -translate-y-1/2 translate-x-2 right-0 hover:cursor-pointer bg-slate-100 rounded-full"
              icon="iconamoon:arrow-right-2"
              onClick={next}
              width={40}
            />
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mb-14">
        {/*Continue reading*/}
        <div className="hidden sm:block">
          <div className="flex justify-between">
            <h2 className="text-2xl text-white">Continue Reading</h2>
            <button
              onClick={() => navigate("/history")}
              className="h-[35px] bg-primary rounded-sm inline-flex items-center px-5 text-white"
            >
              See All
            </button>
          </div>
          <div className=" w-full mt-5 text-[rgba(220,220,220,0.8)]">
            {isEmpty(history) ? (
              <div className="w-full bg-gray-100 flex items-center justify-center p-5 font-semibold">
                EMPTY HISTORY
              </div>
            ) : (
              Object.entries(history)
                .slice(0, 4)
                .map(([mangaId, data], index) => (
                  <HistoryCard
                    key={index}
                    id={mangaId}
                    data={data}
                    handleDelete={() => removeHistory(mangaId)}
                  />
                ))
            )}
          </div>
        </div>

        {/*Popular tag*/}
        <div className="w-full rounded-3xl hidden lg:block">
          <h2 className="text-2xl text-white mb-3">Explore Popular Genres</h2>
          {tag?.map((item, idx) => {
            return <TagItem key={idx} item={item} />;
          })}
          <button className="h-[40px] bg-primary rounded-sm inline-flex items-center px-5 text-white m-2 ">
            See All
          </button>
        </div>

        {/*Popular*/}
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl text-white">Top Manga</h2>
          </div>
          <div className=" w-full mt-5 bg-gray-100 rounded-sm p-5 flex flex-col gap-4">
            {rankingLoading ? (
              <div>Loading</div>
            ) : (
              ranking &&
              ranking?.data
                .slice(0, 5)
                .map((data, index) => (
                  <RankingCard data={data} rank={index} key={index} />
                ))
            )}
          </div>
        </div>
      </section>

      {/* Latest update */}
      <section className="mb-8 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl text-white mb-8">Recently Updated</h2>
          <button
            onClick={() => navigate("/latest")}
            className="h-[40px] bg-primary rounded-sm inline-flex items-center px-5 text-white"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {(!latestUpdates && latestUpdatesLoading) ||
          Object.entries(latestUpdates).length < 1 ? (
            <div>Loading...</div>
          ) : (
            Object.entries(latestUpdates)
              .slice(0, 18)
              .map(([mangaId, { manga, chapterList }]) => {
                return (
                  <DetailCard
                    key={mangaId}
                    manga={manga}
                    chapter={chapterList[0]}
                  />
                );
              })
          )}
        </div>
      </section>

      {/* Recently added */}
      <section>
        <div className="flex justify-between">
          <h2 className="text-2xl text-white mt-8 mb-8">Recently Added</h2>
          <button
            onClick={() => navigate("/search?order[createdAt]=desc")}
            className="h-[40px] bg-primary rounded-sm inline-flex items-center mt-8 px-5 text-white"
          >
            See All
          </button>
        </div>

        {recentlyAddedLoading ? (
          <div>loading...</div>
        ) : (
          <div className="w-full relative">
            <Slider
              slidesToShow={6}
              slidesToScroll={5}
              dots={true}
              draggable={false}
            >
              {recentlyAdded &&
                recentlyAdded?.data?.map((obj, index) => {
                  return <Card key={index} manga={obj} />;
                })}
            </Slider>
          </div>
        )}
      </section>
    </div>
  );
}
