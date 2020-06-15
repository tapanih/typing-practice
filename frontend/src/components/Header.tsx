import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue, logout } from '../state';

const Header: React.FC = () => {
  const [state, dispatch] = useStateValue();

  return (
    <nav className="flex items-center justify-end bg-blue-600 p-3">
      {state.user ?
        <>
          <Link className="login-button mr-2" to="/profile">
            {state.user.username}
          </Link>
          <button className="login-button" onClick={() => dispatch(logout())}>Logout</button>
        </>
        :
        <>
          <Link className="login-button mr-2" to="/login">
            Login
          </Link>
          <Link className="login-button" to="/register">
            Register
          </Link>
        </>
      }
    </nav>
  )
}

export default Header;