import { useEffect, useState } from 'react';
import useToast from '../hook/useToast';
import { handleFetchBaseQueryError } from '../utils/errorFactory';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useApiInfoApiEndpointMutation } from '../stores/apiSlice';
import { ApiInfoResponseData } from '../types/apiSlice';

const FindPage = () => {
  const [apiInfoApiEndpoint, { isLoading: isLoggingIn }] =
    useApiInfoApiEndpointMutation();

  const [ipData, setIpDate] = useState<ApiInfoResponseData>();
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
    e.preventDefault();
    fetchIpInfo(inputIp); // Use the entered IP in the query
  };

  return (
    <div>
      <form className='max-w-md mx-auto mt-10' onSubmit={handleSearch}>
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
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
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

      {isLoggingIn && <p>Loading...</p>}

      {ipData && !isLoggingIn && (
        <div>
          <h2>IP Information</h2>
          <p>IP: {ipData.ip}</p>
          <p>City: {ipData.city}</p>
          <p>Region: {ipData.region}</p>
          <p>Country: {ipData.country}</p>
          <p>Country: {ipData.loc}</p>
          <p>Country: {ipData.postal}</p>
          <p>Country: {ipData.timezone}</p>
        </div>
      )}

      {!ipData && !isLoggingIn && <p>Enter an IP to search for IP data.</p>}
    </div>
  );
};

export default FindPage;
