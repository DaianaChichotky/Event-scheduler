import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className='navbar bg-gray-800 text-white px-6'>
      <div className='flex-1'>
        <Link to='/' className='text-lg font-bold'>
          Event Finder
        </Link>
      </div>

      <div className='flex items-center gap-4'>
        <Link to='/' className='hover:underline'>
          Home
        </Link>
        <Link to='/events/new' className='hover:underline'>
          Create Events
        </Link>

        {/* Profile dropdown */}
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-9 rounded-full bg-gray-600 flex items-center justify-center'>
              {/* Icon profile */}
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
          </div>

          {/* Dropdown menu */}
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
