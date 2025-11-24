
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import NewsItem from './NewsItem';
import '../assets/styles/CategoryNews.css';

const CategoryNews = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('https://eaa0f823bdcaf00e.mokky.dev/news');
        const decodedName = decodeURIComponent(categoryName);
        const filtered = res.data.filter(item => item.category === decodedName);
        setNews(filtered);
      } catch (err) {
        console.error('Ошибка загрузки новостей категории:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="categorynews-loader">
        <ClipLoader color="#808080" size={60} />
      </div>
    );
  }

  const title = decodeURIComponent(categoryName);

  return (
    <div className="categorynews-container">
      {/* Заголовок категории */}
      <div className="categorynews-title">
        {title}
      </div>

      {/* Контент */}
      <div className="categorynews-content">
        {news.length === 0 ? (
          <p className="categorynews-empty">
            Новостей в категории «{title}» пока нет
          </p>
        ) : (
          news.map(item => (
            <NewsItem
              key={item.id}
              item={item}
              onClick={() => navigate(`/news/${item.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryNews;