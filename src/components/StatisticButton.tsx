import { Amazon, Anilist, Animeplanet, Bookwalker, Ebookjapan, Kitsu, Mangaupdates, Myanimelist } from '@/assets/Logos'
import { Link } from 'react-router-dom';


export default function StatisticButton({ title, linkType }: { title?: string, linkType?: string }) {
    let Logo
    if (linkType) {
      switch (linkType) {
        case 'al':
          Logo = Anilist;
          title = 'AniList';
          break;
        case 'ap':
          Logo = Animeplanet;
          title = 'Anime-Planet';
          break;
        case 'bw':
          Logo = Bookwalker;
          title = 'Book☆Walker'
          break;
        case 'mu':
          Logo = Mangaupdates;
          title = "MyAnimeList"
          break;
        // case 'nu':
        //   Logo = Amazon;
        //   title = 'Amazon'
        //   break;
        case 'kt':
          Logo = Kitsu;
          title = 'Kitsu';
          break;
        case 'amz':
          Logo = Amazon;
          title = "Amazon";
          break;
        case 'ebj':
          Logo = Ebookjapan;
          title = "eBookJapan";
          break;
        case 'mal':
          Logo = Myanimelist;
          title = 'MyAnimeList'
          break;
        // case 'cdj':
        //   Logo = Amazon;
        //   title = "Amazon";
        //   break;
        case 'raw':
          title = 'Official Raw'
          break;
        default:
          break;
      }
    }
    return <Link to={"/"} className='text-sm font-bold bg-slate-200 px-2 py-1 rounded-sm flex items-center gap-1 capitalize '>{Logo && <Logo />} {title}</Link>
  }