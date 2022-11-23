import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { urlFor } from '../lib/sanity';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedMultiAnswer, setSelectedMultiAnswer] = useState([]);
  const [corporateScore, setCorporateScore] = useState(0);
  const [digitalScore, setDigitalScore] = useState(0);
  const [engineerScore, setEngineerScore] = useState(0);
  const [serviceScore, setServiceScore] = useState(0);
  const [skilledScore, setSkilledScore] = useState(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const currentImage = urlFor(questions[currentQuestion].imageURL).url();
  const questionNumber = currentQuestion + 1;

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleScore = (e) => {
    e.preventDefault();

    if (e.target[0].type === 'radio') {
      setCorporateScore(
        corporateScore + selectedAnswer.corporateCategoryWeight
      );
      setDigitalScore(digitalScore + selectedAnswer.digitalCategoryWeight);
      setEngineerScore(engineerScore + selectedAnswer.engineerCategoryWeight);
      setServiceScore(serviceScore + selectedAnswer.serviceCategoryWeight);
      setSkilledScore(skilledScore + selectedAnswer.skilledCategoryWeight);
    } else if (e.target[0].type === 'checkbox') {
      selectedMultiAnswer.forEach((answer) => {
        setCorporateScore(corporateScore + answer.corporateCategoryWeight);
        setDigitalScore(digitalScore + answer.digitalCategoryWeight);
        setEngineerScore(engineerScore + answer.engineerCategoryWeight);
        setServiceScore(serviceScore + answer.serviceCategoryWeight);
        setSkilledScore(skilledScore + answer.skilledCategoryWeight);
      });
    }

    if (currentQuestion < questions.length - 1) {
      nextQuestion();
    } else {
      setAllQuestionsAnswered(true);
    }
    setSelectedAnswer(null);
    setSelectedMultiAnswer([]);
  };

  return (
    <section className='max-w-7xl mx-auto p-6'>
      <h1 className='text-4xl font-bold text-center my-12'>Quiz</h1>
      <div className='flex flex-col items-center'>
        <p className='text-2xl font-bold mb-6'>
          {questionNumber} of {questions.length}
        </p>

        {/* Testing Functionality */}
        <div className='bg-purple-200 rounded-lg shadow-lg px-6 py-4 mb-6'>
          <h2 className='text-2xl font-bold mb-4 text-center uppercase'>
            Testing purposes only
          </h2>
          <div className='grid grid-cols-5 gap-4 text-center'>
            <p className='text-lg font-semibold'>
              Corporate Score: {corporateScore}
            </p>
            <p className='text-lg font-semibold'>
              Digital Score: {digitalScore}
            </p>
            <p className='text-lg font-semibold'>
              Engineer Score: {engineerScore}
            </p>
            <p className='text-lg font-semibold'>
              Service Score: {serviceScore}
            </p>
            <p className='text-lg font-semibold'>
              Skilled Score: {skilledScore}
            </p>
          </div>
          <div className='flex justify-center my-6 gap-x-6'>
            <button
              className='bg-red-300 px-6 py-2 rounded shadow-lg'
              onClick={prevQuestion}
            >
              Prev
            </button>
            <button
              className='bg-green-300 px-6 py-2 rounded shadow-lg'
              onClick={nextQuestion}
            >
              Next
            </button>
          </div>
        </div>

        <div className='bg-gray-100 rounded-lg shadow-lg p-6 max-w-2xl'>
          <Image
            className='rounded w-3/4 mx-auto'
            src={currentImage}
            width={500}
            height={500}
            alt={questions[currentQuestion].imageAlt}
          />
          <div className='px-12'>
            <h2 className='text-2xl font-bold'>
              {questions[currentQuestion].question}
            </h2>
            <form
              className='grid grid-cols-1 gap-6 mt-8'
              onSubmit={(e) => handleScore(e)}
            >
              {questions[currentQuestion].answers.map((answer) => (
                <div key={answer._key} className='flex items-center'>
                  {questions[currentQuestion].type === 'checkbox' ? (
                    <input
                      type='checkbox'
                      name={questions[currentQuestion]._id}
                      id={answer._key}
                      onChange={() => selectedMultiAnswer.push(answer)}
                      className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
                    />
                  ) : (
                    <input
                      type='radio'
                      name={questions[currentQuestion]._id}
                      id={answer._key}
                      checked={selectedAnswer === answer}
                      onChange={() => setSelectedAnswer(answer)}
                      className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
                    />
                  )}
                  <label
                    htmlFor={answer._key}
                    className='ml-3 block text-sm font-medium text-gray-700'
                  >
                    {answer.answerBody}
                  </label>
                </div>
              ))}
              {currentQuestion < questions.length && !allQuestionsAnswered && (
                <button
                  type='submit'
                  className='bg-blue-300 px-6 py-2 rounded shadow-lg w-1/3 mx-auto'
                >
                  Confirm
                </button>
              )}
              {currentQuestion >= questions.length - 1 && allQuestionsAnswered && (
                <Link
                  href={{
                    pathname: '/results',
                    query: {
                      corporate: corporateScore,
                      digital: digitalScore,
                      engineer: engineerScore,
                      service: serviceScore,
                      skilled: skilledScore,
                    },
                  }}
                  className='bg-blue-300 px-6 py-2 rounded shadow-lg w-1/2 mx-auto text-center'
                >
                  Check Results
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
