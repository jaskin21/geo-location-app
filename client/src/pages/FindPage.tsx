import { useEffect, useState } from 'react';
import useToast from '../hook/useToast';
import { handleFetchBaseQueryError } from '../utils/errorFactory';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useApiInfoApiEndpointMutation } from '../stores/apiSlice';
import { ApiInfoResponseData } from '../types/apiSlice';
import { MapPin } from '@phosphor-icons/react';

const FindPage = () => {
  const [apiInfoApiEndpoint, { isLoading: isLoggingIn }] =
    useApiInfoApiEndpointMutation();

  const [ipData, setIpDate] = useState<ApiInfoResponseData | undefined>();
  const [inputIp, setInputIp] = useState<string>('');
  const { showSuccessToast, showErrorToast } = useToast();

  const fetchIpInfo = async (ip: string = '') => {
    try {
      const res = await apiInfoApiEndpoint({ ip }).unwrap();

      if (ip) {
        showSuccessToast(res.status);
      }
      setIpDate(res.data);
    } catch (error) {
      const errorMessage = handleFetchBaseQueryError(
        error as FetchBaseQueryError,
        'Invalid IP Address!',
        true
      );
      showErrorToast(`${errorMessage}`);
    }
  };

  useEffect(() => {
    fetchIpInfo();
  }, []); // eslint-disable-line

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setIpDate(undefined);
    e.preventDefault();
    fetchIpInfo(inputIp); // Use the entered IP in the query
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
            placeholder='Search Mockups, Logos...'
            required
            autoComplete='off'
            value={inputIp}
            onChange={(e) => setInputIp(e.target.value)}
          />
          <button
            type='submit'
            disabled={isLoggingIn}
            className={`text-white absolute end-2.5 bottom-2.5  ${
              isLoggingIn ? 'bg-blue-300' : 'bg-blue-700'
            } hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {isLoggingIn ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className='w-4/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
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
        {isLoggingIn && <p>Loading...</p>}

        {ipData && !isLoggingIn && (
          <div className='space-y-2'>
            {/* IP */}
            <div className='flex justify-between text-gray-900 dark:text-white'>
              <span className='font-semibold'>IP:</span>
              <span>{ipData.ip}</span>
            </div>

            {/* City */}
            <div className='flex justify-between text-gray-900 dark:text-white'>
              <span className='font-semibold'>City:</span>
              <span>{ipData.city}</span>
            </div>

            {/* Region */}
            <div className='flex justify-between text-gray-900 dark:text-white'>
              <span className='font-semibold'>Region:</span>
              <span>{ipData.region}</span>
            </div>

            {/* Country */}
            <div className='flex justify-between text-gray-900 dark:text-white'>
              <span className='font-semibold'>Country:</span>
              <span>{ipData.country}</span>
            </div>

            {/* Location */}
            <div className='flex justify-between text-gray-900 dark:text-white'>
              <span className='font-semibold'>Location:</span>
              <span>{ipData.loc}</span>
            </div>

            {/* Postal Code */}
            <div className='flex justify-between text-gray-900 dark:text-white'>
              <span className='font-semibold'>Postal code:</span>
              <span>{ipData.postal}</span>
            </div>

            {/* Timezone */}
            <div className='flex justify-between text-gray-900 dark:text-white'>
              <span className='font-semibold'>Timezone:</span>
              <span>{ipData.timezone}</span>
            </div>
          </div>
        )}

        {!ipData && !isLoggingIn && <p>No Information.</p>}
      </div>
    </div>
  );
};

export default FindPage;
