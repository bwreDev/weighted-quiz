import Link from 'next/link';
import { classNames } from '../lib/classNames';

export default function Nav() {
  return (
    <nav className='flex items-center justify-center gap-4 flex-wrap bg-blue-500 p-6'>
      <Link
        className={classNames(
          'bg-green-400 rounded px-4 py-2',
          'hover:bg-green-500'
        )}
        href='/'
      >
        Home Page
      </Link>
      <Link
        className={classNames(
          'bg-green-400 rounded px-4 py-2',
          'hover:bg-green-500'
        )}
        href='/results'
      >
        Results Page
      </Link>
    </nav>
  );
}
