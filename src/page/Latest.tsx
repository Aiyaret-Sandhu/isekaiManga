import DetailCard2 from "@/components/DetailCard2"
import useLatestChapters from "@/hooks/useLatestChapters"
import getCoverArt from "@/utils/getCoverArt"
import { getMangaTitle } from "@/utils/getTitles"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Latest() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get("page")!) || 1)
    const { latestUpdates, latestUpdatesLoading } = useLatestChapters(page)

    const handlePageClick = (event: { selected: number; }) => {
        setSearchParams(prev => {
            prev.set("page", (event.selected + 1).toString())
            return prev
        })
    };

    useEffect(() => {
        setPage(parseInt(searchParams.get("page")!) || 1)
    }, [searchParams])

    console.log("re render: ", page)

    return (
        <div className="w-full px-5 min-h-screen">
            <div className="flex items-center gap-3 mb-5 cursor-pointer" onClick={() => navigate(-1)}> <Icon icon="ph:arrow-left-bold" width={24} /><h2 className="text-xl">Recently updated.</h2></div>

            <div className="grid grid-cols-1 gap-4">
                {!latestUpdates && latestUpdatesLoading || Object.entries(latestUpdates).length < 1 ? (
                    <div>Loading...</div>
                ) : (
                    Object.entries(latestUpdates)
                        .slice(0, 18)
                        .map(([mangaId, { manga, chapterList }]) => {
                            // console.log(mangaId)
                            return (
                                <DetailCard2
                                    key={mangaId}
                                    chapterList={chapterList}
                                    coverArt={getCoverArt(manga)}
                                    mangaId={mangaId}
                                    mangaTitle={getMangaTitle(manga)}
                                />
                            );
                        })
                )}
                {<ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={15}
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
                />}
            </div>
        </div>
    )
}
