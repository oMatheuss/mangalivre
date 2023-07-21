import { Release, Scan } from '@/types/releases';
import { Link } from 'react-router-dom';
import { Image } from '@/components/image';
import { StarButton } from './star-button';

interface ReleasesProps {
  releases: Release[];
}

export const Releases = ({ releases }: ReleasesProps) => {
  return (
    <ul className='flex flex-col space-y-7'>
      {releases.map((val) => (
        <li
          key={val.id_serie}
          className='relative w-full sm:flex sm:h-48 overflow-hidden bg-slate-100 dark:bg-slate-900 rounded'
        >
          <StarButton
            serie={{
              id: val.id_serie,
              image: val.image,
              link: val.link,
              name: val.name,
            }}
          />
          <Link
            to={val.link}
            className='min-w-fit focus:outline outline-indigo-600 outline-1 -outline-offset-1'
          >
            <Image
              source={[val.image_avif, 'image/avif']}
              src={val.image}
              alt={val.name}
              className='w-full border-b-2 sm:border-none sm:w-auto h-48 flex-none object-center object-contain'
              noImageClass='mx-auto sm:mx-8 h-16 my-8 sm:my-16'
            />
          </Link>
          <div className='p-4 flex flex-col justify-between leading-normal text-center sm:text-left'>
            <h3 className='font-bold text-xl'>
              <Link to={val.link} className='hover:underline'>
                {val.name}
              </Link>
            </h3>
            <h4 className='font-light text-current text-opacity-25 text-sm'>
              {val.chapters
                .flatMap((x) => Object.entries(x.scanlators))
                .flatMap((x) => x[1])
                .reduce((prev, curr) => {
                  return (
                    prev.findIndex(
                      (x) => x.id_scanlator === curr.id_scanlator
                    ) < 0 && prev.push(curr),
                    prev
                  );
                }, [] as Scan[])
                .map((x) => x.name)
                .join(', ')}
            </h4>
            <nav className='select-none'>
              {val.chapters.map((chap) => (
                <Link
                  key={chap.number}
                  className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2 hover:bg-gray-300'
                  to={chap.url}
                >
                  #Capítulo {chap.number}
                </Link>
              ))}
            </nav>
          </div>
        </li>
      ))}
    </ul>
  );
};
