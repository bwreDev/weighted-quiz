import Nav from '../components/Nav';
import Quiz from '../components/Quiz';
import { client } from '../lib/sanity';

export default function Home({ questions }) {
  return (
    <div className='min-h-screen bg-blue-300'>
      <Nav />
      <Quiz questions={questions} />
    </div>
  );
}

export async function getStaticProps() {
  const questions = await client.fetch(`*[_type == 'questions']{
    question,
    imageAlt,
    answers,
    type,
    "imageURL": image.asset->url,
  }`);

  return {
    props: {
      questions,
    },
  };
}
