import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import '../assets/styles/PostForm.css';

const API_URL = 'https://eaa0f823bdcaf00e.mokky.dev/posts';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState({ loading: false, error: null, success: null });
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    const newPost = { title, author };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
      }

      const createdPost = await response.json();
      setStatus({ loading: false, error: null, success: 'Пост успешно создан!' });
      setTitle('');
      setAuthor('');
      setPosts(prev => [createdPost, ...prev]);

    } catch (error) {
      setStatus({ loading: false, error: error.message, success: null });
    }
  };

  return (
    <div className="postform-container">
      <div className="postform-title">
        Обратная связь
      </div>

      <div className="postform-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Текст поста"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="postform-input"
          />
          <input
            type="text"
            placeholder="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="postform-input"
          />
          <button
            type="submit"
            disabled={status.loading}
            className="postform-button"
          >
            {status.loading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>

        {status.success && <div className="postform-message-success">{status.success}</div>}
        {status.error && <div className="postform-message-error">{status.error}</div>}

        <h3 className="postform-list-title">
          Сохранённые посты ({posts.length})
        </h3>

        {loadingPosts ? (
          <div className="postform-loader">
            <ClipLoader color="#10b981" size={50} />
          </div>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px' }}>
            Пока нет постов
          </p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="postform-post-item">
              <strong style={{ fontSize: '18px', display: 'block' }}>{post.title}</strong>
              <span style={{ color: '#64748b' }}>Автор: {post.author}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}