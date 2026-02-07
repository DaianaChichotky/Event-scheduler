import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className='footer sm:footer-horizontal bg-gray-800 text-neutral-content p-10'>
      <nav>
        <h6 className='footer-title'>Services</h6>
        <Link to='/' className='hover:underline'>
          Home
        </Link>
        <Link to='/' className='hover:underline'>
          About
        </Link>
        <Link to='/' className='hover:underline'>
          Contact
        </Link>
      </nav>
      <nav>
        <h6 className='footer-title'>Company</h6>

        <a className='link link-hover'>Jobs</a>
        <a className='link link-hover'>Press kit</a>
      </nav>
      <nav>
        <h6 className='footer-title'>Legal</h6>
        <a className='link link-hover'>Terms of use</a>
        <a className='link link-hover'>Privacy policy</a>
        <a className='link link-hover'>Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
