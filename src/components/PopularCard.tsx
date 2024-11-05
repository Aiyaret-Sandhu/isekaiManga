/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Manga } from '@/api/schema';
import Tag from './Tag';
import getCoverArt from '@/utils/getCoverArt';
import { getMangaTitle } from '@/utils/getTitles';
import { useNavigate } from 'react-router-dom';

export default function PopularCard({ data }: { data?: Manga }) {
    const coverArt = getCoverArt(data);
    const artist = data?.relationships.find(rela => rela.type === 'artist')?.attributes?.name as string || ''
    const author = data?.relationships.find(rela => rela.type === 'author')?.attributes?.name as string || ''
    const navigate = useNavigate();

    if (!data) {
        return <div className='h-[290px] rounded-lg animate-pulse flex p-4 bg-slate-100'>
            <div className='w-[190px] h-full rounded-lg bg-slate-200'></div>

            <div className='ml-4 h-full flex-1 w-full flex flex-col justify-between'>
                <div className='w-full'>
                    <div className='bg-slate-200 w-full h-8 mb-4'></div>
                    {/* Description */}
                    <div className='bg-slate-200 w-full h-20'></div>
                </div>
                {/* Author */}
                <div className='bg-slate-200 w-28 h-6'></div>
            </div>
        </div>
    }

    return (
        <div className='relative flex h-[290px] p-4 rounded-lg transition-all'>
            {/* Background image */}
            <div className="absolute left-0 top-0 w-full h-full z-[-2] rounded-xl overflow-hidden">
                <img src={`${coverArt}`} alt="Background" loading='lazy' className='object-cover w-full h-full blur-lg opacity-30' />
            </div>
            {/* Book cover */}
            <button onClick={() => navigate(`/book/${data.id}`)} className='flex-1 overflow-hidden max-w-[190px] h-full rounded-lg'>
                <img referrerPolicy="no-referrer" src={coverArt} alt="Book Cover" className='object-contain h-full rounded-lg' loading='lazy' />
            </button>
            {/* Book details */}
            <div className='flex-1 ml-4 h-full flex flex-col'>
                <div className='shrink-0 mb-2'>
                    <button onClick={() => navigate(`/book/${data.id}`)}>
                        <span className='text-2xl md:text-3xl lg:text-4xl font-bold line-clamp-2'>{getMangaTitle(data)}</span>
                    </button>
                    <div className='flex gap-2 mt-2 flex-wrap'>
                        {data?.attributes.contentRating === "suggestive" && <Tag contentRating={data?.attributes.contentRating} />}
                        {data.attributes.tags.map((obj, index) => {
                            if (obj.attributes.group === 'genre') {
                                return <Tag key={index} data={obj} />
                            }
                        })}
                    </div>
                </div>
                {/* Description */}
                <div className='overflow-y-auto grow mb-2'>
                    <p className='text-sm overflow-hidden'>
                        {data.attributes?.description['en']}
                        {data.attributes?.description['en']}
                    </p>
                </div>
                {/* Author */}
                <p>{author === artist ? author : author + ", " + artist}</p>
            </div>
        </div>
    )
}
