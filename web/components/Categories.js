export default function Categories({ categories }) {
  return (
    <div className='grid grid-cols-5 gap-4 mt-6'>
      {categories.map((category) => (
        <div className='bg-gray-200 rounded shadow p-6' key={category._id}>
          <h2 className='text-lg font-bold mb-4'>{category.category}</h2>
          <p className='font-light p-2'>{category.description}</p>
        </div>
      ))}
    </div>
  );
}
