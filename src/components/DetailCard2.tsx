/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Chapter } from '@/api/schema'
import { formatNowDistance } from '@/utils/dateFns'
import getChapterTitle from '@/utils/getChapterTitle'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const InnerContent = ({ chapter }: { chapter: Chapter }) => {
    const navigate = useNavigate()
    const chapterTitle = getChapterTitle(chapter)
    return (
        <button onClick={() => navigate(`/chapter/${chapter?.id}`)} className='flex flex-col justify-between h-20 hover:bg-gray-200 p-1 pl-2'>
            <div style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <p className='line-clamp-1 font-semibold'>
                    {chapterTitle}
                </p>
            </div>
            <p className='text-sm line-clamp-1 block'>
                {chapter?.relationships?.[0].attributes?.name || "No Group"}
            </p>
            <p style={{ fontSize: 12 }} className='text-sm line-clamp-1 block'>
                {formatNowDistance(new Date(chapter?.attributes?.readableAt)) || ""}
            </p>
        </button>
    )
}

export default function DetailCard2({ chapterList, coverArt, mangaTitle, mangaId }: { chapterList: Chapter[], coverArt: string, mangaTitle: string, mangaId: string }) {
    const navigate = useNavigate()
    return (
        <div className='mb-4 gap-2 bg-gray-100 p-2 rounded-lg'>
            <button
                onClick={() => navigate(`/book/${mangaId}`)}
                style={{ borderColor: 'rgba(128, 128, 128, 0.5)', borderBottomWidth: 1, width: '100%', textAlign: 'start' }}
            >
                <p className='line-clamp-1 font-bold text-lg'>{mangaTitle}</p>
            </button>
            <div className='flex flex-row w-full'>
                <button
                    onClick={() => navigate(`/book/${mangaId}`)}
                    className='w-14 h-20 md:h-[200px] md:w-[140px] rounded-sm'
                >
                    <img src={coverArt} className='object-cover rounded-sm' />
                </button>
                <div style={{ flex: 1, gap: 10 }} className='flex flex-col flex-1 gap-2'>
                    {chapterList?.map((c, index) => <InnerContent key={index} chapter={c} />)}
                </div>
            </div>
        </div>
    )
}
