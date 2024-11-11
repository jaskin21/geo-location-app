import { MapPinArea } from '@phosphor-icons/react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useGetBookmarkNoteEndpointQuery } from '../../stores/apiSlice';

interface LayoutType {
  logout: () => void;
}

export default function Layout({ logout }: LayoutType) {
  const page = 1;
  const limit = 10;
  const sortField = 'city';
  const sortOrder = 'asc';

  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    data: bookmarkData,
    error: bookmarkError,
    isLoading: bookmarkIsLoading,
    // refetch: bookMarkRefetch,
  } = useGetBookmarkNoteEndpointQuery({
    page,
    limit,
    sortField,
    sortOrder,
  });

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleClickLogout = () => {
    console.log('exit');
    Cookies.remove('token', { path: '/' });
    logout();
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? 'block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'
      : 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700';

  return (
    <div>
      <header>
        <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mb-10'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
            <Link to='/' className='flex items-center'>
              <MapPinArea size={35} color='#e61d65' weight='fill' />
              <h1 className='ml-2 text-2xl font-bold'>Geocoding</h1>
            </Link>

            <div
              className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'
              id='mobile-menu-2'
            >
              <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                <li>
                  <Link to='/' className={isActive('/')}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to='/find' className={isActive('/find')}>
                    Find
                  </Link>
                </li>
                <li>
                  <Link to='/history' className={isActive('/history')}>
                    Log
                  </Link>
                </li>
                <li>
                  <Link to='/contact' className={isActive('/contact')}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className='flex items-center lg:order-2'>
              <button
                onClick={toggleDrawer}
                className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              >
                Archive
              </button>
              <button
                onClick={handleClickLogout}
                className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlay to disable clicks when drawer is open */}
      {isDrawerOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-30'
          onClick={closeDrawer}
        />
      )}

      {/* Drawer Component */}
      <div
        id='drawer-right-example'
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-slate-200 w-96 dark:bg-gray-800 indent-1 `}
        aria-labelledby='drawer-right-label'
      >
        <h5
          id='drawer-right-label'
          className='inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400'
        >
          <svg
            className='w-4 h-4 me-2.5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
          </svg>
          Bookmarks
        </h5>
        <button
          type='button'
          onClick={closeDrawer}
          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
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
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
          <span className='sr-only'>Close menu</span>
        </button>

        <div className='flex flex-col gap-2'>
          {bookmarkIsLoading && (
            <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <div role='status' className='max-w-sm animate-pulse p-0'>
                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-13'></div>

                <span className='sr-only'>Loading...</span>
              </div>
              <div role='status' className='max-w-sm animate-pulse p-0'>
                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-13'></div>

                <span className='sr-only'>Loading...</span>
              </div>
              <div role='status' className='max-w-sm animate-pulse p-0'>
                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-13'></div>

                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}

          {bookmarkError && <p>Error</p>}

          {bookmarkData && (
            <>
              {bookmarkData?.data?.map((item) => (
                <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                  <a href='#'>
                    <h6
                      className='mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white truncate overflow-hidden'
                      title='Noteworthy technology acquisitions 2021'
                    >
                      {item.ip}
                    </h6>
                  </a>
                  <p className='mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2'>
                    {item.note}
                  </p>
                  <a
                    href='#'
                    className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Show
                    <svg
                      className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M1 5h12m0 0L9 1m4 4L9 9'
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
}
