import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-3 shadow-sm bg-white sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between flex-wrap">
          {/* Logo */}
          <div className="mr-4">
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path fillRule="evenodd" d="M18.36 6.64a1 1 0 00-1.41 0L12 11.59 7.05 6.64a1 1 0 00-1.41 1.41L10.59 13l-4.95 4.95a1 1 0 101.41 1.41L12 14.41l4.95 4.95a1 1 0 001.41-1.41L13.41 13l4.95-4.95a1 1 0 000-1.41z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <ul
            className={`w-full md:w-auto flex-col md:flex-row md:flex space-y-2 md:space-y-0 space-x-0 md:space-x-4 mt-4 md:mt-0 ${
              menuOpen ? 'flex' : 'hidden'
            } md:flex items-start md:items-center`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
