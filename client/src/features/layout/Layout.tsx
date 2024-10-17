import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/geo-app'>Home</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}