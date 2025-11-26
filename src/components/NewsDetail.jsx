// src/components/NewsDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import '../assets/styles/NewsDetail.css';

const COMMENTS_API = 'https://eaa0f823bdcaf00e.mokky.dev/comments';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ← добавили для прокрутки и возврата

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка статьи и комментариев
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, commentsRes] = await Promise.all([
          axios.get(`https://eaa0f823bdcaf00e.mokky.dev/news/${id}`),
          fetch(`${COMMENTS_API}?newsId=${id}`).then(r => r.json())
        ]);

        setArticle(newsRes.data);
        setComments(commentsRes);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setArticle(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Плавная прокрутка к комментариям после отправки
  useEffect(() => {
    if (location.state?.scrollToComments) {
      const element = document.getElementById('comments-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Чистим state, чтобы при F5 не прокручивалось снова
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  const handleCommentAdded = (newComment) => {
    setComments(prev => [newComment, ...prev]);
  };

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader color="#6366f1" size={60} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container">
        <div className="not-found">Статья не найдена</div>
      </div>
    );
  }

  return (
    <div className="container">

      {/* Кнопка "Назад" */}
      <div className="back-section" onClick={() => navigate(-1)}>
        <span className="back-arrow">←</span>
        <span className="back-text">Назад</span>
      </div>

      {/* Основной контент статьи */}
      <div className="content">
        <h1 className="title">{article.title}</h1>
        <p className="date">{article.date}</p>
        
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
        />

        {article.image && (
          <img src={article.image} alt={article.title} className="image" />
        )}

        {article.source && (
          <p className="source">
            Источник:{' '}
            <a href={article.sourceUrl || '#'} target="_blank" rel="noopener noreferrer">
              {article.source}
            </a>
          </p>
        )}

        {article.category && (
          <span className="category-tag">{article.category}</span>
        )}

        {/* === КОММЕНТАРИИ === */}
        <div id="comments-section" style={{ marginTop: '80px', paddingTop: '20px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '32px', color: '#1e293b', fontWeight: 'bold' }}>
            Комментарии ({comments.length})
          </h2>

          {/* Форма комментария */}
          <CommentForm newsId={id} onCommentAdded={handleCommentAdded} />

          {/* Список комментариев */}
          {comments.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', padding: '60px 0', fontSize: '18px' }}>
              Пока нет комментариев. Станьте первым!
            </p>
          ) : (
            comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;