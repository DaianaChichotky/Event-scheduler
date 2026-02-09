import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className='text-white px-6 py-4 bg-transparent'>
      <div className='flex justify-end gap-4 w-full'>
        <Link
          to='/'
          style={{ backgroundColor: '#85CE5D' }}
          className='px-4 py-2 rounded-lg font-semibold hover:text-white transition-colors'
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#8B7777')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#85CE5D')}
        >
          Home
        </Link>
        <Link
          to='/events/new'
          style={{ backgroundColor: '#85CE5D' }}
          className='px-4 py-2 rounded-lg font-semibold hover:text-white transition-colors'
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#8B7777')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#85CE5D')}
        >
          Create Event
        </Link>
        {/* Profile */}
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-9 rounded-full bg-gray-600 flex items-center justify-center'>
              {/* Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0'
                />
              </svg>
            </div>
          </label>

          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box mt-3 w-44 p-2 shadow'
          >
            <li>
              <Link to='/sign-up'>Sign up</Link>
            </li>
            <li>
              <Link to='/login'>Log in</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
