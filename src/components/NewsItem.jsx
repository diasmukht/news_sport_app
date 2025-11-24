import React, { useState } from 'react';
import '../assets/styles/NewsItem.css';

const NewsItem = ({ item, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`news-item ${hovered ? 'hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className="news-title">{item.title}</h3>
      <p className="news-date">{item.date}</p>
      <p className="news-category">{item.category}</p>
    </div>
  );
};

export default NewsItem;