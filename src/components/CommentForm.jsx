// src/components/CommentForm.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles/CommentForm.css';

const API_URL = 'https://eaa0f823bdcaf00e.mokky.dev/comments';

export default function CommentForm({ newsId, onCommentAdded }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // ← запоминаем, откуда пришли

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newsId: Number(newsId),
          author: author.trim(),
          text: text.trim(),
          date: new Date().toISOString().split('T')[0]
        })
      });

      if (res.ok) {
        const newComment = await res.json();
        onCommentAdded(newComment);
        setAuthor('');
        setText('');

        // Программная навигация с useNavigate — как в слайдах!
        navigate(location.pathname, {
          replace: true,
          state: { scrollToComments: true } // флаг для прокрутки
        });
      }
    } catch (err) {
      console.error('Ошибка отправки комментария:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="commentform-wrapper">
      <h3 className="commentform-title">Оставить комментарий</h3>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="commentform-input"
        />
        
        <textarea
          placeholder="Поделитесь своими мыслями..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows="4"
          className="commentform-textarea"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="commentform-button"
        >
          {loading ? 'Отправка...' : 'Опубликовать'}
        </button>
      </form>
    </div>
  );
}