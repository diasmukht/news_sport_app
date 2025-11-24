import React from 'react';
import { useNavigate } from 'react-router-dom';

import homeImg from '../assets/images/vse-novosti.png';
import footballImg from '../assets/images/futbol.png';
import basketballImg from '../assets/images/basketbol.png';
import rugbyImg from '../assets/images/regbi.png';
import hockeyImg from '../assets/images/hokkey.png';
import esportsImg from '../assets/images/kibersport.png';
import boxingImg from '../assets/images/bokc.png';
import mixfightImg from '../assets/images/mix-fight.png';

const categories = [
  { title: 'Все новости', image: homeImg, path: '/' },
  { title: 'Футбол', image: footballImg, path: '/category/Футбол' },
  { title: 'Баскетбол', image: basketballImg, path: '/category/Баскетбол' },
  { title: 'Хоккей', image: hockeyImg, path: '/category/Хоккей' },
  { title: 'Киберспорт', image: esportsImg, path: '/category/Киберспорт' },
  { title: 'Бокс', image: boxingImg, path: '/category/Бокс' },
  { title: 'Mix Fight', image: mixfightImg, path: '/category/Mix Fight' },
  { title: 'Регби', image: rugbyImg, path: '/category/Регби' },
];

const CategoryCard = ({ imageSrc, title, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '70px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        cursor: 'pointer',
        boxShadow: '0px 0px 0px 2px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s',
        height: '160px',
        ...(isHovered && {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-4px)',
        }),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img src={imageSrc} alt={title} style={{ width: '80px', height: '80px' }} />
      <p style={{ fontSize: '18px', color: '#353535', margin: 0 }}>{title}</p>
    </div>
  );
};

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{
        backgroundColor: '#fb923c',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
        fontSize: '22px',
        fontWeight: '500'
      }}>
        Категории
      </div>

      <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '60px'
        }}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              imageSrc={cat.image}
              title={cat.title}
              onClick={() => navigate(cat.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;