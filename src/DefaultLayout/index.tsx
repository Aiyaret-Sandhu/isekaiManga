import Header from './Header';
import Sidebar from './Sidebar'
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
  activePage: string;
}


export default function DefaultLayout({ children, activePage }: Props) {
  return (
    <div className='flex max-w-full'>
      <Sidebar className='' activePage={activePage} />
      <div className='flex-1 w-full'>
        <Header />
        <div className='flex-grow'>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
