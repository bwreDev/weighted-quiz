import Link from 'next/link';
import { useRouter } from 'next/router';
import Categories from '../components/Categories';
import { client } from '../lib/sanity';

export default function Results({ categories }) {
  const router = useRouter();
  const { query } = router;
  const scores = Object.entries(query).map(([key, value]) => {
    return {
      category: key,
      score: value,
    };
  });
  const highestScore = scores.reduce((acc, curr) => {
    return acc.score > curr.score ? acc : curr;
  }, 0);

  console.log(categories);

  return (
    <div className='bg-blue-300 min-h-screen'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-2xl font-bold text-center py-6'>Results</h1>
        <div className='grid grid-cols-5 gap-4 mb-6'>
          <p className='bg-gray-200 px-4 py-2 rounded-lg shadow-lg text-center'>
            Corporate: {query.corporate}
          </p>
          <p className='bg-gray-200 px-4 py-2 rounded-lg shadow-lg text-center'>
            Digital: {query.digital}
          </p>
          <p className='bg-gray-200 px-4 py-2 rounded-lg shadow-lg text-center'>
            Engineer: {query.engineer}
          </p>
          <p className='bg-gray-200 px-4 py-2 rounded-lg shadow-lg text-center'>
            Service: {query.service}
          </p>
          <p className='bg-gray-200 px-4 py-2 rounded-lg shadow-lg text-center'>
            Skilled: {query.skilled}
          </p>
        </div>
        <div className='bg-gray-200 rounded-lg shadow-lg px-6 py-4'>
          <p className='text-xl font-bold text-center'>
            Your highest score was:{' '}
            <i className='text-fuchsia-700'>{highestScore.score}</i> in the{' '}
            <i className='text-fuchsia-700'>{highestScore.category}</i>{' '}
            category!
          </p>
        </div>
        <Categories categories={categories} />
        <Link
          className='block bg-green-300 px-6 py-2 rounded-lg shadow-lg text-center mt-6 max-w-sm mx-auto'
          href='/'
        >
          Take the Quiz Again
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const categories = await client.fetch(`*[_type == 'categories']`);

  return {
    props: {
      categories,
    },
  };
}
