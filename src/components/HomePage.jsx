
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import NewsItem from './NewsItem';
import '../assets/styles/HomePage.css';

const API_URL = 'https://eaa0f823bdcaf00e.mokky.dev/news';

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search')?.trim() || '';

  const navigate = useNavigate();

  // Загр новости
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(API_URL);
        setNews(res.data);
        setFilteredNews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Фильтрация 
  useEffect(() => {
    if (!query) {
      setFilteredNews(news);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = news.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      (item.content && item.content.toLowerCase().includes(lowerQuery))
    );
    setFilteredNews(filtered);
  }, [query, news]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader color="#6366f1" size={60} />
      </div>
    );
  }

  return (
    <>
      

      {/* Заголовок */}
      <div className="title-section">
        {query ? `Результаты поиска: «${query}»` : 'Все новости'}
      </div>

      {/* строка поиска */}
      <div className="homepage-search-wrapper">
        <form onSubmit={handleSearch} className="homepage-search-form">
          <input
            name="search"
            type="text"
            placeholder="Поиск по новостям..."
            defaultValue={query}
            className="homepage-search-input"
            autoFocus={!!query}
          />
          <button type="submit" className="homepage-search-btn">
            Искать
          </button>
        </form>

        {query && (
          <div className="homepage-search-info">
            Найдено: <strong>{filteredNews.length}</strong> по запросу «{query}»
            <button
              onClick={() => setSearchParams({})}
              className="homepage-search-clear"
            >
              ×
            </button>
          </div>
        )}
      </div>



      {/* Список новостей */}
      <div className="news-list">
        {filteredNews.length === 0 ? (
          <p className="homepage-empty">
            {query ? `Ничего не найдено по запросу «${query}»` : 'Новостей пока нет'}
          </p>
        ) : (
          filteredNews.map((item) => (
            <NewsItem
              key={item.id}
              item={item}
              onClick={() => handleNewsClick(item.id)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default HomePage;