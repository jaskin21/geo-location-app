import { useGetHistoryListQuery } from '../stores/apiSlice';

const HistoryPage = () => {
  const page = 1;
  const limit = 10;
  const sortField = 'city';
  const sortOrder = 'asc';

  // Use the query hook
  const { data, error, isLoading } = useGetHistoryListQuery({
    page,
    limit,
    sortField,
    sortOrder,
  });

  return (
    <div className='flex justify-center'>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-3/5'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                IP Address
              </th>
              <th scope='col' className='px-6 py-3'>
                City
              </th>
              <th scope='col' className='px-6 py-3'>
                Region
              </th>
              <th scope='col' className='px-6 py-3'>
                Country
              </th>
              <th scope='col' className='px-6 py-3'>
                Postal
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>

          {isLoading && <p>Loading...</p>}

          {error && <p>Error</p>}

          {data && (
            <tbody>
              {data?.data?.map((item) => (
                <tr
                  key={item._id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {item.ip}
                  </th>
                  <td className='px-6 py-4'> {item.city}</td>
                  <td className='px-6 py-4'>{item.region}</td>
                  <td className='px-6 py-4'>{item.country}</td>
                  <td className='px-6 py-4'>{item.postal}</td>
                  <td className='px-6 py-4 text-right'>
                    <a
                      href='#'
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
