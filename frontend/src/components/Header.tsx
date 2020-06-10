import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {

  return (
    <nav className="flex items-center justify-end bg-blue-600 p-3">
      <Link
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white 
                   border-white hover:border-transparent hover:text-blue-600 hover:bg-white mt-4 lg:mt-0"
        to="/login"
      >
        Login
      </Link>
      <Link
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white 
                   border-white hover:border-transparent hover:text-blue-600 hover:bg-white mt-4 lg:mt-0"
        to="/register"
      >
        Register
      </Link>
    </nav>
  )
}

export default Header;