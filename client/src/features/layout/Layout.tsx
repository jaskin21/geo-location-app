import { MapPinArea } from '@phosphor-icons/react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

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
              <Link
                to='#'
                className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              >
                hello user!
              </Link>
              <Link
                to='/login'
                className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
              >
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
