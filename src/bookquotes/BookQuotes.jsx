import React from "react";
import quotes from "./quotes";
import "./BookQuotes.css";

const BookQuotes = () => {
  return (
    <section className="quotes-section">
      <div className="quotes-header">

        <h5>بریده‌هایی از کتاب‌ها</h5>

        <p>
          زیباترین جملات ماندگار از رمان‌ها و کتاب‌های محبوب
        </p>
      </div>

      <div className="quotes-slider">
        {quotes.map((item) => (
          <div className="quote-card" key={item.id}>
            <div className="quote-top">
              <div className="book-chip">📚 {item.book}</div>
            </div>

            <div className="quote-mark">❝</div>

            <p className="quote-text">{item.quote}</p>

            <div className="quote-divider"></div>

            <div className="quote-footer">
            <div className="author-avatar">
             <img src={item.Image} alt={item.book} />
              </div>
              <div>
                <h4>{item.author}</h4>
                <span>{item.book}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookQuotes;