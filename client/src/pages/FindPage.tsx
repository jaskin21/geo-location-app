import { useEffect, useState } from 'react';
import useToast from '../hook/useToast';
import { handleFetchBaseQueryError } from '../utils/errorFactory';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  useApiInfoApiEndpointMutation,
  useGetHistoryListEndpointQuery,
  usePostHistoryEndpointMutation,
} from '../stores/apiSlice';
import { ApiInfoResponseData } from '../types/apiSlice';
import { BookmarkSimple, MapPin } from '@phosphor-icons/react';

const FindPage = () => {
  const [apiInfoApiEndpoint, { isLoading: isLoadingInfo }] =
    useApiInfoApiEndpointMutation();

  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
  const [ipData, setIpDate] = useState<ApiInfoResponseData | undefined>();
  const [inputIp, setInputIp] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  const { showSuccessToast, showErrorToast } = useToast();
  // Use the login mutation hook from RTK Query
  const [postHistoryEnpoint] = usePostHistoryEndpointMutation();
  const { refetch } = useGetHistoryListEndpointQuery({});

  const handleBookMarkedStatus = () => {
    setIsModalOpen(true);
    // setIsBookMarked((prev) => !prev);
  };

  const handleCreateBookMarkNote = () => {
    closeModal()
  }

  const fetchIpInfo = async (ip: string = '', saveHistory: boolean = false) => {
    try {
      const res = await apiInfoApiEndpoint({ ip }).unwrap();

      if (ip) {
        showSuccessToast(res.status);
      }

      if (saveHistory) {
        await postHistoryEnpoint({
          ip: res.data.ip,
          city: res.data.city,
          region: res.data.region,
          country: res.data.country,
          postal: res.data.postal,
          timezone: res.data.timezone,
        }).unwrap();
        refetch();
      }

      setIpDate(res.data);
    } catch (error) {
      const errorMessage = handleFetchBaseQueryError(
        error as FetchBaseQueryError,
        'Invalid IP Address!',
        true
      );
      if (saveHistory) {
        console.log(saveHistory);
        await postHistoryEnpoint({
          ip,
        }).unwrap();
        refetch();
      }
      showErrorToast(`${errorMessage}`);
    }
  };

  useEffect(() => {
    fetchIpInfo();
  }, []); // eslint-disable-line

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setIpDate(undefined);
    e.preventDefault();
    fetchIpInfo(inputIp, true); // Use the entered IP in the query
  };

  return (
    <div className='flex flex-col items-center justify-center gap-10 mb-10'>
      <form className='w-4/12 mx-auto' onSubmit={handleSearch}>
        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search IP Address'
            required
            autoComplete='off'
            value={inputIp}
            onChange={(e) => setInputIp(e.target.value)}
          />
          <button
            type='submit'
            disabled={isLoadingInfo}
            className={`text-white absolute end-2.5 bottom-2.5  ${
              isLoadingInfo ? 'bg-blue-300' : 'bg-blue-700'
            } hover:bg-blue-800 h-9 w-20 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {isLoadingInfo ? (
              <div role='status' className='flex justify-center align-middle'>
                <svg
                  aria-hidden='true'
                  className='h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      <div className='w-4/12 p-6 relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        {!isLoadingInfo && (
          <button
            onClick={handleBookMarkedStatus}
            className='absolute -top-3 right-3 p-1 rounded-full transition-transform transform hover:scale-110'
          >
            {isBookMarked ? (
              <BookmarkSimple size={44} color='#31C48D' weight='fill' />
            ) : (
              <BookmarkSimple size={44} />
            )}
          </button>
        )}

        <div className='flex flex-row gap-2 justify-center'>
          <MapPin size={32} />
          <a href='#'>
            <h5 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              IP Information
            </h5>
          </a>
        </div>
        <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
          Based on the geolocation data, the IP address has the following
          information
        </p>

        <div className='space-y-2'>
          {/* IP */}
          <div className='flex justify-between text-gray-900 dark:text-white'>
            <span className='font-semibold'>IP:</span>
            {isLoadingInfo ? (
              <div className='h-2.5 bg-gray-300 animate-pulse rounded-full dark:bg-gray-700 w-28 mb-4'></div>
            ) : (
              <span>{ipData ? ipData.ip : '-'}</span>
            )}
          </div>

          {/* City */}
          <div className='flex justify-between text-gray-900 dark:text-white'>
            <span className='font-semibold'>City:</span>
            {isLoadingInfo ? (
              <div className='h-2.5 bg-gray-300 animate-pulse rounded-full dark:bg-gray-700 w-16 mb-4'></div>
            ) : (
              <span>{ipData ? ipData.city : '-'}</span>
            )}
          </div>

          {/* Region */}
          <div className='flex justify-between text-gray-900 dark:text-white'>
            <span className='font-semibold'>Region:</span>
            {isLoadingInfo ? (
              <div className='h-2.5 bg-gray-300 animate-pulse rounded-full dark:bg-gray-700 w-24 mb-4'></div>
            ) : (
              <span>{ipData ? ipData.region : '-'}</span>
            )}
          </div>

          {/* Country */}
          <div className='flex justify-between text-gray-900 dark:text-white'>
            <span className='font-semibold'>Country:</span>
            {isLoadingInfo ? (
              <div className='h-2.5 bg-gray-300 animate-pulse rounded-full dark:bg-gray-700 w-14 mb-4'></div>
            ) : (
              <span>{ipData ? ipData.country : '-'}</span>
            )}
          </div>

          {/* Location */}
          <div className='flex justify-between text-gray-900 dark:text-white'>
            <span className='font-semibold'>Location:</span>
            {isLoadingInfo ? (
              <div className='h-2.5 bg-gray-300 animate-pulse rounded-full dark:bg-gray-700 w-28 mb-4'></div>
            ) : (
              <span>{ipData ? ipData.loc : '-'}</span>
            )}
          </div>

          {/* Postal Code */}
          <div className='flex justify-between text-gray-900 dark:text-white'>
            <span className='font-semibold'>Postal code:</span>
            {isLoadingInfo ? (
              <div className='h-2.5 bg-gray-300 animate-pulse rounded-full dark:bg-gray-700 w-14 mb-4'></div>
            ) : (
              <span>{ipData ? ipData.postal : '-'}</span>
            )}
          </div>

          {/* Timezone */}
          <div className='flex justify-between text-gray-900 dark:text-white'>
            <span className='font-semibold'>Timezone:</span>
            {isLoadingInfo ? (
              <div className='h-2.5 bg-gray-300 animate-pulse rounded-full dark:bg-gray-700 w-32 mb-4'></div>
            ) : (
              <span>{ipData ? ipData.timezone : '-'}</span>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          id='crud-modal'
          tabIndex={-1}
          aria-hidden='true'
          className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50'
        >
          <div className='relative p-4 w-full max-w-md'>
            {/* Modal content */}
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
              {/* Modal header */}
              <div className='flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Create Note
                </h3>
                <button
                  type='button'
                  onClick={closeModal}
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className='p-4 md:p-5' onSubmit={handleCreateBookMarkNote}>
                <div className='grid gap-4 mb-4 grid-cols-2'>
                  <div className='col-span-2'>
                    <label
                      htmlFor='description'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Note Description
                    </label>
                    <textarea
                      id='description'
                      rows={4}
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                      placeholder='Write note description here'
                    ></textarea>
                  </div>
                </div>
                <button
                  type='submit'
                  className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  <svg
                    className='mr-1 -ml-1 w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Add note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindPage;
