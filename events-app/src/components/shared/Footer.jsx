import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className='bg-white mt-16'>
      <div className='max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-[#8B7777]'>
        {/* Brand / descripción */}
        <div>
          <h3 className='text-2xl font-bold mb-2'>Event Finder</h3>
          <p className='text-sm'>
            Discover events around the world and never miss what’s happening
            near you.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className='font-semibold mb-3'>Navigation</h4>
          <ul className='space-y-2'>
            <li>
              <Link className='hover:underline' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='hover:underline' to='/events/new'>
                Create Event
              </Link>
            </li>
            <li>
              <Link className='hover:underline' to='/login'>
                Log in
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal / extra */}
        <div>
          <h4 className='font-semibold mb-3'>About</h4>
          <p className='text-sm'>Built using React & Tailwind.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-[#8B7777]/30 text-center py-4 text-sm text-[#8B7777]'>
        © {new Date().getFullYear()} Event Finder — All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
