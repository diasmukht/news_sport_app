// src/components/SharedLayout.jsx
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../assets/styles/SharedLayout.css';

const SharedLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ТВОЙ ФИКСИРОВАННЫЙ ХЕДЕР С БУРГЕРОМ */}
      <header className="header">
        <button
          className="menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </header>

      {/* БОКОВОЕ МЕНЮ */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>Главная</NavLink>
          <NavLink to="/categories" className="nav-link" onClick={() => setIsOpen(false)}>Категории</NavLink>
          <NavLink to="/post" className="nav-link" onClick={() => setIsOpen(false)}>Обратная связь</NavLink>
        </nav>
      </div>

      {/* Тёмный фон при открытом меню */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      {/* Контент страницы */}
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;