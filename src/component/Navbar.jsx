import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isAddTodoPage = location.pathname === '/todo';

  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: '#0866ff' }}>
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ color: 'white', fontWeight: 'bold' }}>
          Home
        </Link>
        <ul className="navbar-nav ms-auto display flex">
          <li className="nav-item">
            <Link className="nav-link" to="/todo">Add Todo</Link>
          </li>
          {isAddTodoPage ? (
            <li className="nav-item">
              <Link className="nav-link signout-link" to="/logout">Sign out</Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
