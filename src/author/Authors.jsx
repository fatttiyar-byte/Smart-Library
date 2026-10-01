// src/components/authors/Authors.jsx

import React, { useRef } from 'react';
import './author.css';
import author from './author';

const Authors = () => {
  const scrollContainerRef = useRef(null);
  
  // فیلتر نویسنده‌های برتر (محبوب‌ترین‌ها)
const topAuthors = author.filter((author) => author.popular);  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };

  const handleViewAll = () => {
  
    //  navigate('/authors');
    

  };

  return (
    <section className="authors-section">
      <div className="container">
        {/* هدر */}
        <div className="authors-header">
          <h2 className="authors-title">
            نویسنده‌های ایرانی
          </h2>
          <button 
            className="view-all-btn"
            onClick={handleViewAll}
          >
            مشاهده همه نویسنده‌ها
          </button>
        </div>

        {/* کانتینر اسکرول */}
        <div style={{ position: 'relative' }}>
          {/* دکمه چپ */}
          <button 
            className="scroll-btn scroll-btn-left"
            onClick={scrollLeft}
            aria-label="اسکرول به چپ"
          >
           ❯
          </button>

          {/* لیست نویسنده‌ها */}
          <div 
            className="authors-scroll-container"
            ref={scrollContainerRef}
          >
          {topAuthors.map((author) => (
              <div 
                key={author.id} 
                className="author-scroll-item"
              >
                <div className="author-card">
                  {/* تصویر */}
                  <div className="author-card-image-wrapper">
                    <img 
                      src={author.image} 
                      alt={author.name}
                      className="author-card-image"
                    />
                    <div className="author-rating">
                      ⭐ {author.rating}
                    </div>
                  </div>

                  {/* محتوا */}
                  <div className="author-card-body">
                    <h3 className="author-name">{author.name}</h3>
                    <p className="author-nationality">
                      {author.nationality}
                    </p>
                    
                    <p className="author-years">
                      {author.birthYear} - {author.deathYear || 'تاکنون'}
                    </p>

                    <p className="author-bio">
                      {author.bio}
                    </p>

                    {/* کتاب‌ها */}
                    <div className="author-books">
                      {author.books.map((book, index) => (
                        <span key={index} className="author-book-tag">
                          📚 {book}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* دکمه راست */}
          <button 
            className="scroll-btn scroll-btn-right"
            onClick={scrollRight}
            aria-label="اسکرول به راست"
          >
             ❮
            
          </button>
        </div>
      </div>
    </section>
  );
};

export default Authors;