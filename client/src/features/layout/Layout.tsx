import { MapPinArea } from '@phosphor-icons/react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <div className='flex items-center justify-center p-5'>
        <MapPinArea size={50} color='#e61d65' weight='fill' />
        <h1 className='ml-2 text-4xl font-bold'>Geocoding</h1>{' '}
      </div>
      {/* <nav>
        <ul>
          <li>
            <Link to='/geo-app'>Home</Link>
          </li>
        </ul>
      </nav> */}
      <Outlet />
    </div>
  );
}
