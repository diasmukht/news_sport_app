import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';   
import '../assets/styles/SharedLayout.css';

const SharedLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();   

  const handleLogout = () => {
    logout();           
    setIsOpen(false);   
  };

  return (
    <>
      <header className="header">
        <button
          className="menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </header>

      {/* МЕНЮ */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Главная
          </NavLink>
          <NavLink to="/categories" className="nav-link" onClick={() => setIsOpen(false)}>
            Категории
          </NavLink>
          <NavLink to="/post" className="nav-link" onClick={() => setIsOpen(false)}>
            Обратная связь
          </NavLink>

          {/* КНОПКА ВЫХОДА */}
          <div className="nav-link logout-link" onClick={handleLogout}>
            Выйти
          </div>

          {/* По желанию — приветствие */}
          {user && (
            <div className="user-greeting">
              Привет, {user.email || 'пользователь'}!
            </div>
          )}
        </nav>
      </div>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
 